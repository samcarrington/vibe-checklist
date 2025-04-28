module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/checklist-app'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@/data/checklistData.json': '<rootDir>/src/data/checklistData.json',
    '@/components/ui/checkbox': '<rootDir>/src/components/ui/checkbox.tsx',
    '@/lib/utils': '<rootDir>/src/lib/utils.ts',
    '@/components/ui/button': '<rootDir>/src/components/ui/button.tsx',
  },
};