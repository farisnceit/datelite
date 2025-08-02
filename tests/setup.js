// Jest setup file
require('jest-environment-jsdom');

// Mock DOM methods that might not be available in jsdom
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock scrollTo
global.scrollTo = jest.fn();

// Mock getComputedStyle
global.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(() => ''),
}));

// Setup DOM
document.body.innerHTML = '';

// Add common test utilities
global.createTestElement = (id = 'test-input') => {
  const input = document.createElement('input');
  input.id = id;
  input.type = 'text';
  document.body.appendChild(input);
  return input;
};

global.cleanupTestElements = () => {
  document.body.innerHTML = '';
};