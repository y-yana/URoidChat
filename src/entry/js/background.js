bubbly({
  colorStart: '#6edbff',
  colorStop: '#6edbff',
  blur: 5,
  compose: 'source-over',
  bubbles: 80,
  velocityFunc: () => Math.random() * 1.3,
  radiusFunc: () => Math.random() * 20,
  bubbleFunc: () => `hsla(${Math.random() * 360}, 50%, 85%, .18)`
});
