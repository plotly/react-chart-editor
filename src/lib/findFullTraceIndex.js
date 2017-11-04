export default function findFullTraceIndex(fullData = [], traceIndex) {
  for (let i = 0; i < fullData.length; i++) {
    if (traceIndex === fullData[i].index) {
      return i;
    }
  }

  return -1;
}
