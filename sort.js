// Generate an array of random numbers
function generateArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

// Display the array as bars
function displayArray(array) {
  const arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';

  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
  });
}


// Bubble Sort algorithm
async function bubbleSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1);
        displayArray(array);
      }
    }
  }
}

// Quick Sort algorithm
async function quickSort(array, low, high) {
  if (low < high) {
    const partitionIndex = await partition(array, low, high);
    await quickSort(array, low, partitionIndex - 1);
    await quickSort(array, partitionIndex + 1, high);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      await swap(array, i, j);
      displayArray(array);
    }
  }
  await swap(array, i + 1, high);
  displayArray(array);
  return i + 1;
}

// Merge Sort algorithm
async function mergeSort(array, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);
    await merge(array, start, mid, end);
    displayArray(array);
  }
}

async function merge(array, start, mid, end) {
  const n1 = mid - start + 1;
  const n2 = end - mid;
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  for (let i = 0; i < n1; i++) {
    leftArray[i] = array[start + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = array[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = start;
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    await sleep(getDelay());
  }

  while (i < n1) {
    array[k] = leftArray[i];
    i++;
    k++;
    await sleep(getDelay());
  }

  while (j < n2) {
    array[k] = rightArray[j];
    j++;
    k++;
    await sleep(getDelay());
  }
}

// Insertion Sort algorithm
async function insertionSort(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      displayArray(array);
      await sleep(getDelay());
    }
    array[j + 1] = key;
  }
  displayArray(array);
}

// Swap two elements in the array
async function swap(array, i, j) {
  await sleep(getDelay());
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Delay between each step of the sorting process
function getDelay() {
  const speedInput = document.querySelector('#speed');
  return 100 - parseInt(speedInput.value);
}

// Utility function to sleep for the given milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const generateArrayButton = document.querySelector('#generate-array');
  const bubbleSortButton = document.querySelector('#bubble-sort');
  const quickSortButton = document.querySelector('#quick-sort');
  const mergeSortButton = document.querySelector('#merge-sort');
  const insertionSortButton = document.querySelector('#insertion-sort');
  const arraySizeInput = document.querySelector('#array-size');

  let array = generateArray(parseInt(arraySizeInput.value));
  displayArray(array);

  generateArrayButton.addEventListener('click', () => {
    array = generateArray(parseInt(arraySizeInput.value));
    displayArray(array);
  });

  bubbleSortButton.addEventListener('click', async () => {
    await bubbleSort(array.slice());
  });

  quickSortButton.addEventListener('click', async () => {
    await quickSort(array.slice(), 0, array.length - 1);
  });

  mergeSortButton.addEventListener('click', async () => {
    await mergeSort(array.slice(), 0, array.length - 1);
  });

  insertionSortButton.addEventListener('click', async () => {
    await insertionSort(array.slice());
  });
});
