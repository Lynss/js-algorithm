const PENDING = Symbol('pending');
const FULFILLED = Symbol('fulfilled');
const REJECTED = Symbol('rejected');

class MyPromise {
    _status;
    _value;
    onResolveCallbacks = [];
    onRejectCallbacks = [];

    onResolve = (value) => {
        if (this._status === PENDING) {
            this._status = FULFILLED;
            this._value = value;
            this.onResolveCallbacks.forEach(onResolveCallback => onResolveCallback());
        }
    };

    onReject = (value) => {
        if (this._status === PENDING) {
            this._status = REJECTED;
            this._value = value;
            this.onRejectCallbacks.forEach(onRejectCallback => onRejectCallback());
        }
    };

    constructor(executor) {
        this._status = PENDING;
        try {
            executor(this.onResolve, this.onReject);
        } catch (e) {
            this.onReject(e);
        }
    }

    flatPromise(targetResult) {
        const self = this;
        if (self === targetResult) {
            self.onReject('循环引用');
            return;
        }
        const targetType = Object.prototype.toString.call(targetResult);
        if (targetType !== '[object Function]' || targetType !== '[object Object]') {
            self.onResolve(targetResult);
            return;
        }
        try {
            typeof targetResult.then === 'function' && targetResult.then(value => {
                self.flatPromise(value);
            });
        } catch (e) {
            self.onReject(e);
        }
    }

    then(onResolve, onReject) {
        const onFulfilled = typeof onResolve === 'function' ? onResolve : value => value;
        //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后then的resolve中捕获
        const onRejected = typeof onReject === 'function' ? onReject : err => {
            throw err;
        };
        const self = this;
        const thenPromise = new MyPromise((resolve, reject) => {
            if (self._status === PENDING) {
                self.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const result = onFulfilled(self._value);
                            thenPromise.flatPromise(result);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                self.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const result = onRejected(self._value);
                            thenPromise.flatPromise(result);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            } else if (thenPromise._status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const result = onFulfilled(self._value);
                        thenPromise.flatPromise(result);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (thenPromise._status === REJECTED) {
                setTimeout(() => {
                    try {
                        const result = onRejected(self._value);
                        thenPromise.flatPromise(result);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });
        return thenPromise;
    }

    finally(fn) {
        return this.then(value => {
            fn();
            return value;
        }, reason => {
            fn();
            throw reason;
        });
    };

    static resolve(value) {
        return new MyPromise((resolve) => {
            resolve(value);
        });
    }

    static reject(value) {
        return new MyPromise((resolve, reject) => {
            reject(value);
        });
    }
}

const promiseOne = new MyPromise((resolve, reject) => {
    setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('success');
            } else {
                reject('error');
            }
        }
        , 1000);
});

promiseOne.then(console.warn.bind(console), console.error.bind(console)).finally(() => console.info('finally'));