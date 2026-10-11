/** 站点级配置：考试与阶段规划。日期为预估，官方安排公布后改这里即可。 */
export const EXAM_DATE = '2027-12-25';
export const EXAM_DATE_NOTE = '预计 2027 年 12 月下旬，以官方公告为准';

export interface Phase {
  name: string;
  until: string; // ISO 日期（含）
  desc: string;
}

/** 备考三阶段（按一轮完整复习的常见节奏切分） */
export const PHASES: Phase[] = [
  { name: '基础', until: '2027-06-30', desc: '吃透定义与计算，逐章过知识点，配合实验室建立直觉' },
  { name: '强化', until: '2027-10-31', desc: '题型归纳与综合训练，错题本滚动清零' },
  { name: '冲刺', until: '2027-12-25', desc: '套卷模考、公式速查每日过、查缺补漏' },
];
