/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import bootstrap from './src/App.bootstrap'
import bgMessagingService from './src/services/bgMessagingService'

AppRegistry.registerComponent(appName, () => bootstrap)
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessagingService
) // <-- Add this line
