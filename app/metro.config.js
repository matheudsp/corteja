const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return withNativeWind({
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        '@/': './app/',
      },
    },
  }, {
    input: './global.css'
  });
})();
