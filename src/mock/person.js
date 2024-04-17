import Mock from "mockjs";
let Random = Mock.Random;
// let template = {
//   status: 200,
//   "list|1-10": [
//     {
//       id: "@id()",
//       name: function () {
//         return "name" + this.id;
//       },
//       ip: "@ip()",
//       email: "@email()",
//       "string1|1-10": "☆",
//       "float1|1-10.1-5": 1,
//       "flag|1-5": true,
//       "childen|1": {
//         310000: "上海市",
//         320000: "江苏省",
//         330000: "浙江省",
//         340000: "安徽省",
//       },
//       path: "我的id是:@id 我的名字是@name ",
//       date: "@datetime()",
//       nowDate: "@now()",
//       color: "@color()",
//       dataImage: function () {
//         return Random.dataImage("100x100", this.id);
//       },
//       header: function () {
//         return Random.image("200x200", this.color, "png", this.name);
//       },
//       remake: "@csentence(1,3)",
//     },
//   ],
// };
let template = {
  status: 200,
  "list|10": [
    {
      'id|+2':1,
      name: "@cname()",
      "job|1": [
        "前端工程师",
        "后端工程师",
        "技术总监",
        "技术总监助理",
        "UI设计师",
      ],
      "num|1-10.2-5":1,
      "age|22-35": 1,
      remake: "@cparagraph()",
      date: "@datetime()",
      nowDate: "@now()",
      desc: "我的名字叫@name 我的岗位是:@job",
    },
  ],
};
let res = Mock.mock("/person", "get", template);
console.log(Mock.toJSONSchema(template));
export default res;
