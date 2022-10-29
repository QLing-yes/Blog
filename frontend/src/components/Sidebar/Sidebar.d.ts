type Sidebar = {
  /** 折叠状态 */
  fall?: boolean,
  /** ["左图标", "标题", "右图标","路由"] */
  tab: string[],
  sub?: Sidebar['tab'][]
}
