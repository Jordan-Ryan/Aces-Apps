const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { resolve } = require('metro-resolver');

const config = getDefaultConfig(__dirname);

// Prefer compiled entries to avoid resolving TS sources in node_modules
config.resolver = config.resolver || {};
config.resolver.mainFields = ['main', 'module', 'react-native'];

// Force resolve screens and gesture-handler to compiled commonjs builds
config.resolver.resolveRequest = (context, moduleName, platform) => {
  let rewritten = moduleName;
  if (moduleName === 'react-native-screens' || moduleName.startsWith('react-native-screens/')) {
    rewritten = moduleName.replace('react-native-screens', 'react-native-screens/lib/commonjs');
  }
  if (moduleName === 'react-native-gesture-handler' || moduleName.startsWith('react-native-gesture-handler/')) {
    rewritten = rewritten.replace('react-native-gesture-handler', 'react-native-gesture-handler/lib/commonjs');
  }
  return resolve(context, rewritten, platform);
};

module.exports = config;
