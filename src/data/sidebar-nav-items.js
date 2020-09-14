export default function() {
  return [
    {
      title: "매장 로그인",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/storelogin",
    },
    {
      title: "매장관리",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/store",
    },
    {
      title: "메뉴관리",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/menu",
    },
    {
      title: "유저 로그인",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/login",
    },
    {
      title: "주문하기",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/orderstore",
    },
    {
      title: "주문내역",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/orderlist",
    },
    {
      title: "매장승인",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/approve",
    },
  ];
}
