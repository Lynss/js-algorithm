function returnTarget(arg1) {
  console.warn(arg1);
  return this;
}

let me = "me";

Function.prototype.myBind = function(thisArg, ...rest) {
  return () => this.apply(thisArg, rest);
};

const returnMe = returnTarget.myBind(me, me);

console.assert(returnMe() === me, "Unexpected");
