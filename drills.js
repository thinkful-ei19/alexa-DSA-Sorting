'use strict';

const data = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

///////////////////////////// QUICK SORT /////////////////////////////

// qSort counter
let qCounter = 0;
// partition counter
let pCounter = 0;
// swaps counter
let sCounter = 0;

// swaps the values at two indices in an array
function swap(array, i, j) {
  sCounter++;
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

// picks end as pivot
// loop through array, swapping values as you go to put them on either side of pivot
// put pivot into correct place in array
function partition(array, start, end) {
  pCounter++;
  let compares = 0;
  let swaps = 0;
  const pivot = array[end - 1];
  let j = start;
  for (let i=start; i<end - 1; i++) {
    compares++;
    if (array[i] <= pivot) {
      compares++;
      swap(array, i, j);
      j++;
      swaps++;
    }
  }
  swap(array, end-1, j);
  // console.log('this is the number of compares: ', compares);
  // console.log('this is the number of compares: ', swaps);
  return j;
}

// divide and conquer
// partition array into two halves around pivot value
// values < pivot --> go on one half of array
// values > pivot --> go on other half of array
// then, recursively sort two halves of the array until halves are length 0 or 1
function qSort(array, start=0, end=array.length) {
  qCounter++;
  start = start;
  end = end;
 

  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

// console.log(qSort(data));
qSort(data);

function quickSortCounter() {
  console.log('this is qCounter:', qCounter);
  console.log('this is pCounter:', pCounter);
  console.log('this is sCounter:', sCounter);
  const totalCounter = qCounter + pCounter + sCounter;
  console.log('this is totalCounter:', totalCounter);
}

// quickSortCounter();


///////////////////////////// MERGE SORT /////////////////////////////

// to merge, keep choosing lowest value from left or right arrays
// which hasnt already been added to the output
// when one array is empty, then just add all of the remaining values from the other to the array

let mergeCounter = 0;
let mergeSortCounter = 0;

function merge(left, right, array) {
  mergeCounter++;

  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i=leftIndex; i<left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i=rightIndex; i<right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}


// divide and conquer
// breaks array down to smaller chunks
// then merges them back together in the correct order

// if array has 0 or 1 elements, then its sorted
// slice array into two halves
// sort each half by recursively calling mSort
// two sorted halves are then merged togethr in correct order using merge function
function mSort(array) {
  mergeSortCounter++;

  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}

// console.log(mSort(data));
mSort(data);

function mergeSortCounterTotal() {
  console.log('this is mergeCounter:', mergeCounter);
  console.log('this is mergeSortCounter:', mergeSortCounter);
  const mergeSortTotalCounter = mergeCounter + mergeSortCounter;
  console.log('this is mergeSortTotalCounter:', mergeSortTotalCounter);
}

// mergeSortCounterTotal();


///////////////////////////// BUCKET SORT /////////////////////////////

// Create vars for i, min, max, and bucket size
//   Find min and max value
//   Create amount of buckets
//   Push values to correct buckets 
//   Sort bucket

function bucketSort(arr, min, max) {
  if (arr.length === 1) {
    return arr;
  }

  let buckets = Math.floor(arr.length / 3);
  console.log(`created ${buckets}`);
  let bucketArr = new Array(buckets);
  

  for (let i = 0; i<bucketArr.length; i++) {
    bucketArr[i] = [];
  }

  console.log('this is bucketArr', bucketArr);

}

// bucketSort(data, Math.min(...data), Math.max(...data));

///////////////////////////// SORT IN PLACE /////////////////////////////

function shuffle(arr) {
  let currIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  // while there are elements to shuffle
  while(currIndex !== 0) {
  // pick a remaining element
    randomIndex = Math.floor(Math.random() * currIndex);
    console.log('this is randomIndex:', randomIndex);
    currIndex = currIndex - 1;
    console.log('this is currIndex:', currIndex);

    // swap random element with current element
    temporaryValue = arr[currIndex];
    console.log('this is temporaryValue:', temporaryValue);
    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

let arr = [1, 2, 16, 44];
arr = shuffle(arr);
console.log('this is the shuffled arr:', arr);


///////////////////////////// SORTING BOOKS /////////////////////////////

// If I were given 20 books to sort alphetically, I'd first sort them by using quick sort. 
// This should sort the books alphebetically by their first letter.
// I'd then have to check for duplicates, or where two books start with the same letter.
// recursively sort again and repeat until all books are sorted