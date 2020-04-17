const HOME = {name: '首页'}
const ACCOUNT = {name: '账户管理', disabled: true}
const FIELD = {name: '字段管理'}
const GROUP = {name: '群组管理'}
const ORGANIZATION = {name: '组织管理'}
const POSITION = {name: '职位管理'}
const STAFF = {name: '员工管理'}
const RULECHAINS = {name: '规则链库'}
const CUTOMERS = {name: '客户'}
const ASSETS = {name: '资产'}
const ENTITYVIEWS = {name: '实体视图'}
const DEVICES = {name: '设备'}
const WIDGETSBUNDLES = {name: '部件库'}
const DASHBOARDS = {name: '仪表盘库'}
const AUDITLOGS = {name: '审计日志'}
export default [
  {
    name: 'index',
    breadcrumb: [HOME],
  },
  {
    name: 'home',
    breadcrumb: [HOME],
  },
  {
    name: 'ruleChains',
    breadcrumb: [RULECHAINS],
  },
  {
    name: 'customers',
    breadcrumb: [CUTOMERS],
  },
  {
    name: 'assets',
    breadcrumb: [ASSETS],
  },
  {
    name: 'entityViews',
    breadcrumb: [ENTITYVIEWS],
  },
  {
    name: 'devices',
    breadcrumb: [DEVICES],
  },
  {
    name: 'widgets-bundles',
    breadcrumb: [WIDGETSBUNDLES],
  },
  {
    name: 'dashboards',
    breadcrumb: [DASHBOARDS],
  },
  {
    name: 'auditLogs',
    breadcrumb: [AUDITLOGS],
  },
  {
    name: 'account-field',
    breadcrumb: [ACCOUNT, FIELD],
  },
  {
    name: 'account-group',
    breadcrumb: [ACCOUNT, GROUP],
  },
  {
    name: 'account-organization',
    breadcrumb: [ACCOUNT, ORGANIZATION],
  },
  {
    name: 'account-position',
    breadcrumb: [ACCOUNT, POSITION],
  },
  {
    name: 'account-staff',
    breadcrumb: [ACCOUNT, STAFF],
  },
]
