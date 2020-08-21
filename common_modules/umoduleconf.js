const pathRoot           = "/usr/src/app";

const pathSrc            = pathRoot + "/common/src";
const pathInNodeModules  = pathRoot + "/node_modules/@common";

const pathSrcDeploy = [
    pathSrc + '/type'
]

module.exports = {
    pathRoot,
    pathSrc,
    pathInNodeModules,
    pathSrcDeploy
}