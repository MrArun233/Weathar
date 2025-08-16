// Map weathar condition codes to categories.
// Each Key Represent a waethar type , with any arrya of codes from the weathar API,

export const weatherConditionMap = {
  Clear: [1000],
  Clouds: [1003, 1006, 1009],
  mist: [1030, 1135, 1147],
  rain: [1063,1156,1153,1168,1171,1180,1183,1198,1201,1240,1243,1246,1273,1276],
  moderate_heavy_rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246],
  Snow: [1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,1261,1264,1279,1282],
  thunder: [1087, 1279, 1282],
  thunder_rain: [1273,1276],
  Blizzard: [1117],
  Hail: [1237, 1261, 1264],
};