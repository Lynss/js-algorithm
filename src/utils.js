import _ from 'lodash';

const compareTwoArray = (arr1, arr2) => {
    return _.isEqual(arr1.sort(), arr2.sort());
};

export {compareTwoArray};
