function mediaQueryHeight (heights, breakpoint) {
  if (typeof heights === 'object') {
    const bpOrders = { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 };
    const bps = Object.keys(heights).sort((a, b) => (bpOrders[a] - bpOrders[b]));

    let matchingBP;
    let bp;
    for (let i = 0; i < bps.length; i += 1) {
      bp = bps[i];
      if (bpOrders[bp] > bpOrders[breakpoint]) {
        break;
      }
      if (bps[i] === breakpoint) {
        matchingBP = bps[i];
        break;
      }
      matchingBP = bps[i];
    }
    return matchingBP ? `${heights[matchingBP]}px` : 'auto';
  }
  if (typeof heights === 'number') {
    return `${heights}px`;
  }
  return 'auto';
}

export default mediaQueryHeight;
