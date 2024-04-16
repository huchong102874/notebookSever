const axios = require("axios");
const cheerio = require("cheerio");
const { writeFile, readFile } = require("../src/fshandler");
const { resourcesCode } = require("../../src/mysql/sql");
const { pLimit } = require("../../src/utils/p-limit");
const limit = pLimit(2);

let url = "https://www.w3cschool.cn/tailwind_css/tailwind_css-8ys43pb0.html";

const getData = async (params) => {
  let { url, id, title, father_id, father_title } = params;
  let res = await axios.get(url);
  var str = res.data;
  var reg =
    /<div class="content-bg">((.|\n|\r|\t)+?)(?=<!--控制本地字体主题样式-->)/gi;
  var matchResult = str.match(reg);
  if (matchResult?.length > 0) {
    let tempdata = matchResult[0];
    let data = {
      code_title: title,
      code_content: tempdata,
      category_id: id,
      mark: "tailwind",
      tags: "tailwind",
      father_id,
      father_title,
    };
    return resourcesCode.create(data);
  }
};
// getData();
function getMenu() {
  let ddItem = document.querySelectorAll(
    "#nestable_handbook>.dd-list>.dd-item"
  );
  let urlList = [];
  for (let index = 0; index < ddItem.length; index++) {
    1;
    const [demo, childrenList] = ddItem[index].children;
    let obj = {};
    obj.title = demo.innerText;
    let arr = [];
    let tempList = childrenList.children;
    for (let index2 = 0; index2 < tempList.length; index2++) {
      const demo2 = tempList[index2];
      let obj1 = {};
      let a = demo2.querySelector("a");
      if (a) {
        obj1.url = a.href;
      }
      obj1.id = demo2.dataset.id;
      obj1.title = demo2.innerText;

      arr.push(obj1);
    }
    obj.children = arr;
    urlList.push(obj);
  }
  return urlList;
}

let arr1 = [
  {
    id: "Tailwind CSS--1",
    title: "  Tailwind CSS 入门",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ld2m3p8q.html",
        id: "tailwind_css-ld2m3p8q",
        title: "Tailwind CSS 安装",
      },
      {
        url: "https://github.com/tailwindlabs/tailwindcss/releases",
        id: "tailwind_css-7jlt3p8r",
        title: "Tailwind CSS 发布说明",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-kqr43p8s.html",
        id: "tailwind_css-kqr43p8s",
        title: "Tailwind CSS 升级指南",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-p4rc3p8t.html",
        id: "tailwind_css-p4rc3p8t",
        title: "Tailwind CSS 编辑器支持",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-u2gz3p8u.html",
        id: "tailwind_css-u2gz3p8u",
        title: "Tailwind CSS 使用预处理器",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-vcbz3p8v.html",
        id: "tailwind_css-vcbz3p8v",
        title: "Tailwind CSS 生产优化",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-vneu3p8w.html",
        id: "tailwind_css-vneu3p8w",
        title: "Tailwind CSS 浏览器支持",
      },
    ],
  },
  {
    id: "Tailwind CSS--2",
    title: "  Tailwind CSS 核心概念",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-36ob3pai.html",
        id: "tailwind_css-36ob3pai",
        title: "Tailwind CSS 功能类优先",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-wzop3paj.html",
        id: "tailwind_css-wzop3paj",
        title: "Tailwind CSS 响应式设计",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-w5jg3pak.html",
        id: "tailwind_css-w5jg3pak",
        title: "Tailwind CSS 悬停、焦点和其他状态",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-w5k73pal.html",
        id: "tailwind_css-w5k73pal",
        title: "Tailwind CSS 深色模式",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ph713pam.html",
        id: "tailwind_css-ph713pam",
        title: "Tailwind CSS 添加基础样式",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-jiw83pan.html",
        id: "tailwind_css-jiw83pan",
        title: "Tailwind CSS 提取组件",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-5jv83pao.html",
        id: "tailwind_css-5jv83pao",
        title: "Tailwind CSS 添加新的功能类",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-n7ft3pap.html",
        id: "tailwind_css-n7ft3pap",
        title: "Tailwind CSS 函数与指令",
      },
    ],
  },
  {
    id: "Tailwind CSS--3",
    title: "  Tailwind CSS 定制",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-urvb3paq.html",
        id: "tailwind_css-urvb3paq",
        title: "Tailwind CSS 配置",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-8b1v3par.html",
        id: "tailwind_css-8b1v3par",
        title: "Tailwind CSS Just-in-Time Mode",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-wb743pas.html",
        id: "tailwind_css-wb743pas",
        title: "Tailwind CSS 主题",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-h6853pat.html",
        id: "tailwind_css-h6853pat",
        title: "Tailwind CSS 断点",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-tl3r3pau.html",
        id: "tailwind_css-tl3r3pau",
        title: "Tailwind CSS 颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7x4y3pav.html",
        id: "tailwind_css-7x4y3pav",
        title: "Tailwind CSS 间距",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-6pnl3paw.html",
        id: "tailwind_css-6pnl3paw",
        title: "Tailwind CSS 变体",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-1veu3pax.html",
        id: "tailwind_css-1veu3pax",
        title: "Tailwind CSS 插件",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-r7kp3pay.html",
        id: "tailwind_css-r7kp3pay",
        title: "Tailwind CSS 预设",
      },
    ],
  },
  {
    id: "Tailwind CSS--4",
    title: "  Tailwind CSS 基础样式",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-5fex3paz.html",
        id: "tailwind_css-5fex3paz",
        title: "Tailwind CSS Preflight",
      },
    ],
  },
  {
    id: "Tailwind CSS--5",
    title: "  Tailwind CSS 布局",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-8ys43pb0.html",
        id: "tailwind_css-8ys43pb0",
        title: "Tailwind CSS 容器",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-9vl63pb1.html",
        id: "tailwind_css-9vl63pb1",
        title: "Tailwind CSS Box Decoration Break",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-j5d73pb2.html",
        id: "tailwind_css-j5d73pb2",
        title: "Tailwind CSS Box Sizing",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-8rbu3pb3.html",
        id: "tailwind_css-8rbu3pb3",
        title: "Tailwind CSS Display",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-2lnb3pb4.html",
        id: "tailwind_css-2lnb3pb4",
        title: "Tailwind CSS 浮动",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-toge3pb5.html",
        id: "tailwind_css-toge3pb5",
        title: "Tailwind CSS 清除浮动",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-hm1v3pb6.html",
        id: "tailwind_css-hm1v3pb6",
        title: "Tailwind CSS Isolation",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-iktb3pb7.html",
        id: "tailwind_css-iktb3pb7",
        title: "Tailwind CSS Object Fit",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-u7md3pb8.html",
        id: "tailwind_css-u7md3pb8",
        title: "Tailwind CSS Object Position",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-3xrq3pb9.html",
        id: "tailwind_css-3xrq3pb9",
        title: "Tailwind CSS Overflow",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-47fj3pba.html",
        id: "tailwind_css-47fj3pba",
        title: "Tailwind CSS Overscroll Behavior",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-3fc73pbb.html",
        id: "tailwind_css-3fc73pbb",
        title: "Tailwind CSS 定位",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-kh1x3pbc.html",
        id: "tailwind_css-kh1x3pbc",
        title: "Tailwind CSS Top / Right / Bottom / Left",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ikdl3pbd.html",
        id: "tailwind_css-ikdl3pbd",
        title: "Tailwind CSS 可见性",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-l8vc3pbe.html",
        id: "tailwind_css-l8vc3pbe",
        title: "Tailwind CSS Z-Index",
      },
    ],
  },
  {
    id: "Tailwind CSS--6",
    title: "  Tailwind CSS 弹性盒子和网格",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-wfm63pbf.html",
        id: "tailwind_css-wfm63pbf",
        title: "Tailwind CSS Flex Direction",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-j7o43pbg.html",
        id: "tailwind_css-j7o43pbg",
        title: "Tailwind CSS Flex Wrap",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-xzhu3pbh.html",
        id: "tailwind_css-xzhu3pbh",
        title: "Tailwind CSS Flex",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-u1983pbi.html",
        id: "tailwind_css-u1983pbi",
        title: "Tailwind CSS Flex Grow",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-oi833pbj.html",
        id: "tailwind_css-oi833pbj",
        title: "Tailwind CSS Flex Shrink",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-p9q63pbk.html",
        id: "tailwind_css-p9q63pbk",
        title: "Tailwind CSS Order",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-uo7e3pbl.html",
        id: "tailwind_css-uo7e3pbl",
        title: "Tailwind CSS Grid Template Columns",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7l5z3pbm.html",
        id: "tailwind_css-7l5z3pbm",
        title: "Tailwind CSS Grid Column Start / End",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-yuqe3pbn.html",
        id: "tailwind_css-yuqe3pbn",
        title: "Tailwind CSS Grid Template Rows",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-epyu3pbo.html",
        id: "tailwind_css-epyu3pbo",
        title: "Tailwind CSS Grid Row Start / End",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-91v23pbp.html",
        id: "tailwind_css-91v23pbp",
        title: "Tailwind CSS Grid Auto Flow",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-dhua3pbq.html",
        id: "tailwind_css-dhua3pbq",
        title: "Tailwind CSS Grid Auto Columns",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-u97b3pbr.html",
        id: "tailwind_css-u97b3pbr",
        title: "Tailwind CSS Grid Auto Rows",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-gmav3pbs.html",
        id: "tailwind_css-gmav3pbs",
        title: "Tailwind CSS Gap",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-f2im3pbt.html",
        id: "tailwind_css-f2im3pbt",
        title: "Tailwind CSS Justify Content",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-gwrh3pbu.html",
        id: "tailwind_css-gwrh3pbu",
        title: "Tailwind CSS Justify Items",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ysgj3pbv.html",
        id: "tailwind_css-ysgj3pbv",
        title: "Tailwind CSS Justify Self",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-bl6k3pbw.html",
        id: "tailwind_css-bl6k3pbw",
        title: "Tailwind CSS Align Content",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-421i3pbx.html",
        id: "tailwind_css-421i3pbx",
        title: "Tailwind CSS Align Items",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-4ti33pby.html",
        id: "tailwind_css-4ti33pby",
        title: "Tailwind CSS Align Self",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-lw3t3pbz.html",
        id: "tailwind_css-lw3t3pbz",
        title: "Tailwind CSS Place Content",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-zf5l3pc0.html",
        id: "tailwind_css-zf5l3pc0",
        title: "Tailwind CSS Place Items",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-hju53pc1.html",
        id: "tailwind_css-hju53pc1",
        title: "Tailwind CSS Place Self",
      },
    ],
  },
  {
    id: "Tailwind CSS--7",
    title: "  Tailwind CSS 间距",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-rxab3pc2.html",
        id: "tailwind_css-rxab3pc2",
        title: "Tailwind CSS 内边距",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-hber3pc3.html",
        id: "tailwind_css-hber3pc3",
        title: "Tailwind CSS 外边距",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-dp3r3pc4.html",
        id: "tailwind_css-dp3r3pc4",
        title: "Tailwind CSS 间距",
      },
    ],
  },
  {
    id: "Tailwind CSS--8",
    title: "  Tailwind CSS 尺寸",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ilg33pc5.html",
        id: "tailwind_css-ilg33pc5",
        title: "Tailwind CSS 宽度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-eakg3pc6.html",
        id: "tailwind_css-eakg3pc6",
        title: "Tailwind CSS 最小宽度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-l23j3pc7.html",
        id: "tailwind_css-l23j3pc7",
        title: "Tailwind CSS 最大宽度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-n9ul3pc8.html",
        id: "tailwind_css-n9ul3pc8",
        title: "Tailwind CSS 高度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-3wiy3pc9.html",
        id: "tailwind_css-3wiy3pc9",
        title: "Tailwind CSS 最小高度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-qms63pca.html",
        id: "tailwind_css-qms63pca",
        title: "Tailwind CSS 最大高度",
      },
    ],
  },
  {
    id: "Tailwind CSS--9",
    title: "  Tailwind CSS 排版",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7tyq3pcb.html",
        id: "tailwind_css-7tyq3pcb",
        title: "Tailwind CSS 字体序列",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-2jrw3pcc.html",
        id: "tailwind_css-2jrw3pcc",
        title: "Tailwind CSS 字体大小",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-4zng3pcd.html",
        id: "tailwind_css-4zng3pcd",
        title: "Tailwind CSS 字体平滑度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7umk3pce.html",
        id: "tailwind_css-7umk3pce",
        title: "Tailwind CSS 字体样式",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-qy573pcf.html",
        id: "tailwind_css-qy573pcf",
        title: "Tailwind CSS 字体粗细",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-cemb3pcg.html",
        id: "tailwind_css-cemb3pcg",
        title: "Tailwind CSS Font Variant Numeric",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-6iuh3pch.html",
        id: "tailwind_css-6iuh3pch",
        title: "Tailwind CSS 字母间距",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-mjwd3pci.html",
        id: "tailwind_css-mjwd3pci",
        title: "Tailwind CSS 行高",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-gjlm3pcj.html",
        id: "tailwind_css-gjlm3pcj",
        title: "Tailwind CSS 列表项标记类型",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-srfa3pck.html",
        id: "tailwind_css-srfa3pck",
        title: "Tailwind CSS 列表项标记位置",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-43cr3pcl.html",
        id: "tailwind_css-43cr3pcl",
        title: "Tailwind CSS 占位文本颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-xbog3pcm.html",
        id: "tailwind_css-xbog3pcm",
        title: "Tailwind CSS 占位文本不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-eubv3pcn.html",
        id: "tailwind_css-eubv3pcn",
        title: "Tailwind CSS 文本对齐",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-aybn3pco.html",
        id: "tailwind_css-aybn3pco",
        title: "Tailwind CSS 文本颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-xnew3pcp.html",
        id: "tailwind_css-xnew3pcp",
        title: "Tailwind CSS 文本颜色不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-bjry3pcq.html",
        id: "tailwind_css-bjry3pcq",
        title: "Tailwind CSS 文本装饰",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-fskz3pcr.html",
        id: "tailwind_css-fskz3pcr",
        title: "Tailwind CSS 文本转换",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-sxkc3pcs.html",
        id: "tailwind_css-sxkc3pcs",
        title: "Tailwind CSS 文本溢出",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-bg3t3pct.html",
        id: "tailwind_css-bg3t3pct",
        title: "Tailwind CSS 垂直对齐",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-51te3pcu.html",
        id: "tailwind_css-51te3pcu",
        title: "Tailwind CSS 空格",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-hxti3pcv.html",
        id: "tailwind_css-hxti3pcv",
        title: "Tailwind CSS 文本换行",
      },
    ],
  },
  {
    id: "Tailwind CSS--10",
    title: "  Tailwind CSS 背景",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-78o43pcw.html",
        id: "tailwind_css-78o43pcw",
        title: "Tailwind CSS 背景图像固定",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-vnbf3pcx.html",
        id: "tailwind_css-vnbf3pcx",
        title: "Tailwind CSS 背景图像裁剪",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-u7c53pcy.html",
        id: "tailwind_css-u7c53pcy",
        title: "Tailwind CSS 背景颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-eh8u3pcz.html",
        id: "tailwind_css-eh8u3pcz",
        title: "Tailwind CSS 背景颜色不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-cuq33pd0.html",
        id: "tailwind_css-cuq33pd0",
        title: "Tailwind CSS Background Origin",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-aul63pd1.html",
        id: "tailwind_css-aul63pd1",
        title: "Tailwind CSS 背景图像位置",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-2bmj3pd2.html",
        id: "tailwind_css-2bmj3pd2",
        title: "Tailwind CSS 背景图像重复",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-97o43pd3.html",
        id: "tailwind_css-97o43pd3",
        title: "Tailwind CSS 背景图像大小",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-qayz3pd4.html",
        id: "tailwind_css-qayz3pd4",
        title: "Tailwind CSS 背景图像",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-h5ep3pd5.html",
        id: "tailwind_css-h5ep3pd5",
        title: "Tailwind CSS 渐变色停止",
      },
    ],
  },
  {
    id: "Tailwind CSS--11",
    title: "  Tailwind CSS 边框",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-gemb3pd6.html",
        id: "tailwind_css-gemb3pd6",
        title: "Tailwind CSS 边框圆角",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-cwo33pd7.html",
        id: "tailwind_css-cwo33pd7",
        title: "Tailwind CSS 边框厚度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-8mxl3pd8.html",
        id: "tailwind_css-8mxl3pd8",
        title: "Tailwind CSS 边框颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-z2i73pd9.html",
        id: "tailwind_css-z2i73pd9",
        title: "Tailwind CSS 边框不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-kijm3pda.html",
        id: "tailwind_css-kijm3pda",
        title: "Tailwind CSS 边框样式",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7bwx3pdb.html",
        id: "tailwind_css-7bwx3pdb",
        title: "Tailwind CSS 分割线厚度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-l39w3pdc.html",
        id: "tailwind_css-l39w3pdc",
        title: "Tailwind CSS 分割线颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-jesn3pdd.html",
        id: "tailwind_css-jesn3pdd",
        title: "Tailwind CSS 分割线不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7lp43pde.html",
        id: "tailwind_css-7lp43pde",
        title: "Tailwind CSS 分割线样式",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7h6l3pdf.html",
        id: "tailwind_css-7h6l3pdf",
        title: "Tailwind CSS 轮廓环厚度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-iajm3pdg.html",
        id: "tailwind_css-iajm3pdg",
        title: "Tailwind CSS 轮廓环颜色",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-fe3l3pdh.html",
        id: "tailwind_css-fe3l3pdh",
        title: "Tailwind CSS 轮廓环不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-tub13pdi.html",
        id: "tailwind_css-tub13pdi",
        title: "Tailwind CSS 轮廓环偏移厚度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-9wt63pdj.html",
        id: "tailwind_css-9wt63pdj",
        title: "Tailwind CSS 轮廓环偏移颜色",
      },
    ],
  },
  {
    id: "Tailwind CSS--12",
    title: "  Tailwind CSS 效果",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-tvn23pdk.html",
        id: "tailwind_css-tvn23pdk",
        title: "Tailwind CSS 盒阴影",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-otc63pdl.html",
        id: "tailwind_css-otc63pdl",
        title: "Tailwind CSS 不透明度",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-4ozi3pdm.html",
        id: "tailwind_css-4ozi3pdm",
        title: "Tailwind CSS Mix Blend Mode",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ea7z3pdn.html",
        id: "tailwind_css-ea7z3pdn",
        title: "Tailwind CSS Background Blend Mode",
      },
    ],
  },
  {
    id: "Tailwind CSS--13",
    title: "  Tailwind CSS 过滤器",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-v2an3pdo.html",
        id: "tailwind_css-v2an3pdo",
        title: "Tailwind CSS Filter",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-n2ix3pdp.html",
        id: "tailwind_css-n2ix3pdp",
        title: "Tailwind CSS Blur",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-oszu3pdq.html",
        id: "tailwind_css-oszu3pdq",
        title: "Tailwind CSS Brightness",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-68js3pdr.html",
        id: "tailwind_css-68js3pdr",
        title: "Tailwind CSS Contrast",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-4s573pds.html",
        id: "tailwind_css-4s573pds",
        title: "Tailwind CSS Drop Shadow",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-g1vu3pdt.html",
        id: "tailwind_css-g1vu3pdt",
        title: "Tailwind CSS Grayscale",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-42mb3pdu.html",
        id: "tailwind_css-42mb3pdu",
        title: "Tailwind CSS Hue Rotate",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-bmat3pdv.html",
        id: "tailwind_css-bmat3pdv",
        title: "Tailwind CSS Invert",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-mbwk3pdw.html",
        id: "tailwind_css-mbwk3pdw",
        title: "Tailwind CSS Saturate",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-vx8i3pdx.html",
        id: "tailwind_css-vx8i3pdx",
        title: "Tailwind CSS Sepia",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-46ve3pdy.html",
        id: "tailwind_css-46ve3pdy",
        title: "Tailwind CSS Backdrop Filter",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-p9ln3pdz.html",
        id: "tailwind_css-p9ln3pdz",
        title: "Tailwind CSS Backdrop Blur",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-7hqc3pe0.html",
        id: "tailwind_css-7hqc3pe0",
        title: "Tailwind CSS Backdrop Brightness",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-agwo3pe1.html",
        id: "tailwind_css-agwo3pe1",
        title: "Tailwind CSS Backdrop Contrast",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-yjok3pe2.html",
        id: "tailwind_css-yjok3pe2",
        title: "Tailwind CSS Backdrop Grayscale",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-id4b3pe3.html",
        id: "tailwind_css-id4b3pe3",
        title: "Tailwind CSS Backdrop Hue Rotate",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-iox63pe4.html",
        id: "tailwind_css-iox63pe4",
        title: "Tailwind CSS Backdrop Invert",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-2ev73pe5.html",
        id: "tailwind_css-2ev73pe5",
        title: "Tailwind CSS Backdrop Opacity",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-d6o83pe6.html",
        id: "tailwind_css-d6o83pe6",
        title: "Tailwind CSS Backdrop Saturate",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-kihj3pe7.html",
        id: "tailwind_css-kihj3pe7",
        title: "Tailwind CSS Backdrop Sepia",
      },
    ],
  },
  {
    id: "Tailwind CSS--14",
    title: "  Tailwind CSS 表格",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-qcyr3pe8.html",
        id: "tailwind_css-qcyr3pe8",
        title: "Tailwind CSS 表格边框",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ehmd3pe9.html",
        id: "tailwind_css-ehmd3pe9",
        title: "Tailwind CSS 表格布局",
      },
    ],
  },
  {
    id: "Tailwind CSS--15",
    title: "  Tailwind CSS 过渡和动画",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-5usq3pea.html",
        id: "tailwind_css-5usq3pea",
        title: "Tailwind CSS 过渡属性",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-wmat3peb.html",
        id: "tailwind_css-wmat3peb",
        title: "Tailwind CSS 过渡持续时间",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-epjw3pec.html",
        id: "tailwind_css-epjw3pec",
        title: "Tailwind CSS 过渡计时函数",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-a6og3ped.html",
        id: "tailwind_css-a6og3ped",
        title: "Tailwind CSS 过渡延迟",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-2lbw3pee.html",
        id: "tailwind_css-2lbw3pee",
        title: "Tailwind CSS 动画",
      },
    ],
  },
  {
    id: "Tailwind CSS--16",
    title: "  Tailwind CSS 转换",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-dkfr3pef.html",
        id: "tailwind_css-dkfr3pef",
        title: "Tailwind CSS 变换",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-64ga3peg.html",
        id: "tailwind_css-64ga3peg",
        title: "Tailwind CSS 变换原点",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ukf23peh.html",
        id: "tailwind_css-ukf23peh",
        title: "Tailwind CSS 缩放",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-6riw3pei.html",
        id: "tailwind_css-6riw3pei",
        title: "Tailwind CSS 旋转",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-rp8g3pej.html",
        id: "tailwind_css-rp8g3pej",
        title: "Tailwind CSS 平移",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-ams23pek.html",
        id: "tailwind_css-ams23pek",
        title: "Tailwind CSS 倾斜",
      },
    ],
  },
  {
    id: "Tailwind CSS--17",
    title: "  Tailwind CSS 交互",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-nj7i3pel.html",
        id: "tailwind_css-nj7i3pel",
        title: "Tailwind CSS 表单外观",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-918d3pem.html",
        id: "tailwind_css-918d3pem",
        title: "Tailwind CSS 光标效果",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-b7dc3pen.html",
        id: "tailwind_css-b7dc3pen",
        title: "Tailwind CSS 轮廓",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-z1jr3peo.html",
        id: "tailwind_css-z1jr3peo",
        title: "Tailwind CSS 指向事件",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-6su53pep.html",
        id: "tailwind_css-6su53pep",
        title: "Tailwind CSS 大小调整",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-9ye63peq.html",
        id: "tailwind_css-9ye63peq",
        title: "Tailwind CSS 用户选择",
      },
    ],
  },
  {
    id: "Tailwind CSS--18",
    title: "  Tailwind CSS SVG",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-odxi3per.html",
        id: "tailwind_css-odxi3per",
        title: "Tailwind CSS 填充",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-n9se3pes.html",
        id: "tailwind_css-n9se3pes",
        title: "Tailwind CSS 线条",
      },
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-bwk73pet.html",
        id: "tailwind_css-bwk73pet",
        title: "Tailwind CSS 线条厚度",
      },
    ],
  },
  {
    id: "Tailwind CSS--19",
    title: "  Tailwind CSS 可访问性",
    children: [
      {
        url: "https://www.w3cschool.cn/tailwind_css/tailwind_css-unfz3peu.html",
        id: "tailwind_css-unfz3peu",
        title: "Tailwind CSS 屏幕阅读器",
      },
    ],
  },
  {
    id: "Tailwind CSS--20",
    title: "  Tailwind CSS 官方插件",
    children: [
      {
        url: "https://github.com/tailwindlabs/tailwindcss-typography",
        id: "tailwind_css-m1xl3pev",
        title: "Tailwind CSS Typography",
      },
      {
        url: "https://github.com/tailwindlabs/tailwindcss-forms",
        id: "tailwind_css-b7la3pew",
        title: "Tailwind CSS Forms",
      },
      {
        url: "https://github.com/tailwindlabs/tailwindcss-aspect-ratio",
        id: "tailwind_css-xceq3pex",
        title: "Tailwind CSS Aspect Ratio",
      },
      {
        url: "https://github.com/tailwindlabs/tailwindcss-line-clamp",
        id: "tailwind_css-n12z3pey",
        title: "Tailwind CSS Line Clamp",
      },
    ],
  },
];

const submitData = async () => {
  // let reslut = await getData()
  // forin;
  let count = 0;
  for (const items of arr1) {
    let input = [];
    for (const item of items.children) {
      if (item.url.includes("https://www.w3cschool.cn/")) {
        count++
        console.log(count)
        input.push(
          limit(() =>
            getData({
              father_id: items.id,
              father_title: items.title,
              ...item,
            })
          )
        );
      }
    }

    // const result = await Promise.all(input);
  }
};
submitData();
