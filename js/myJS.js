$(document).ready(function() {
    var i = 1; 

    function kiemTraHo() {
        var i=1;
        let ho = $("#txtLastname").val();
        let mauKT = /([A-Z]{1}[a-z]+)$/
        if(ho==""){
            $("#tbLastname").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(ho)) {
            $("#tbLastname").html("Ký tự đầu viết hoa không dùng số");
            return false;
        }
        $("#tbLastname").html("*");
        return true;
      }
      $("#txtLastname").blur(kiemTraHo);

    function kiemTraTen() {
        var i=1;
        let mauMotTen = /^[A-Z]{1}[a-z]+$/
        let ten = $("#txtFirstname").val();
        let mauKT = /([A-Z]{1}[a-z]+)((\s{1}[A-Z]{1}[a-z]+){1,})$/;
        if(ten==""){
            $("#tbFirstname").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(ten)) {
            if (mauMotTen.test(ten)) {
                $("#tbFirstname").html("*");
                return true;
            } else {
                $("#tbFirstname").html("Mỗi ký tự đầu viết hoa không sử dụng số");
                return false;
            }
        }
        $("#tbFirstname").html("*");
        return true;
      }
      $("#txtFirstname").blur(kiemTraTen);
    
      function kiemTraTenTaiKhoan() {
        var i=1;
        let username = $("#txtUsername").val();
        let mauKT = /^[a-z0-9_-]{3,16}$/;
        if(username==""){
            $("#tbUsername").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(username)) {
            $("#tbUsername").html("Ít nhất 3 ký từ và tối đa 16 ký tự");
            return false;
        }
        $("#tbUsername").html("*");
        return true;
      }
      $("#txtUsername").blur(kiemTraTenTaiKhoan);

      function kiemTraMatKhau() {
        var i=1;
        let matkhau = $("#txtPassword").val();
        let mauKT = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(matkhau==""){
            $("#tbPassword").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(matkhau)) {
            $("#tbPassword").html("Ít nhất 8 ký tự có chữ lẫn số");
            return false;
        }
        $("#tbPassword").html("*");
        return true;
      }
      $("#txtPassword").blur(kiemTraMatKhau);

      function kiemTraEmail() {
        var i=1;
        let email = $("#txtEmail").val();
        let mauKT = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if(email==""){
            $("#tbEmail").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(email)) {
            $("#tbEmail").html("Phải nhập đúng định dạng email");
            return false;
        }
        $("#tbEmail").html("*");
        return true;
      }
      $("#txtEmail").blur(kiemTraEmail);


    function kiemTraSDT() {
        var mauKT = /^0\d{3}\d{3}\d{3}$/;
        var SDT = $("#SDT").val();
        if (SDT=="") {
            $("#tbSDT").html("Không được để trống");
            return false;
        }
        if (!mauKT.test(SDT)) {
            $("#tbSDT").html("Không cần nhập dấu - và nhập đúng định dạng mẫu");
            return false;
        }
        $("#tbSDT").html("*");
        return true;
    }
    $("#SDT").blur(kiemTraSDT);

    /*$("#Save").click(function () { 
        markup = "<tr><td>" + $("SDT").val() + "</td></tr>";
        tableBody = $("table tbody");
        tableBody.append(markup);
        lineNo++;
        
    });*/

    $("#Save").click(function () { 
        if(kiemTraEmail()==true && kiemTraHo()==true && kiemTraMatKhau()==true && kiemTraSDT()==true && kiemTraTen()==true && kiemTraTenTaiKhoan()==true){
            alert("Nhập thông tin thành công");
            row = "<tr>";
            row += "<th>" + (i++) + "</th>";
            row += "<th>" + $("#txtLastname").val() + "</th>";
            row += "<th>" + $("#txtFirstname").val() + "</th>";
            row += "<th>" + $("#txtUsername").val() + "</th>";
            row += "<th>" + $("#txtPassword").val() + "</th>";
            row += "<th>" + $("#txtEmail").val() + "</th>";
            row += "<th>" + $("#SDT").val() + "</th>";
            row += "</tr>"
            $("#danhsach").append(row);
        }
        else{
            alert("Chưa nhập đủ thông tin");
        }
    });

    $("#Login").click(function () { 
        if (kiemTraTenTaiKhoan()==true && kiemTraMatKhau()==true) {
            alert("Đăng nhập thành công");
        } else {
            alert("Đăng nhập thất bại");
        }
        
    });
// timkiemsanpham
    $("#btnSearch").click(function () { 
        var ten = $("#txtSearch").val();
        ten = ten.toLowerCase();
        $("#goSearch").attr("href", "html/oxford/"+ten+".html");
    });
    
})
// Search cua hang ggmap
$(document).ready(function () {
    var public_spreadsheet_url = "../https___beclassy.vn - Sheet1 - https___beclassy.vn - Sheet1 - https___beclassy.vn - Sheet1 - https___beclassy.vn - Sheet1.csv";
    init_spreadsheet(public_spreadsheet_url);
  });
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  };
  function filterItemInList(object) {
    var q = slug(object.val());
    object.next().find('.itemStore').show();
    if (q.length > 0) {
      object.next().find('.itemStore').each(function () {
        if ($(this).attr("data-filter").indexOf(q) == -1)
          $(this).hide();
      })
    }
  };
  function init_spreadsheet(public_spreadsheet_url) {
    Papa.parse(public_spreadsheet_url, {
      download: true,
      header: true,
      complete: function (results) {
        showInfo(results.data)
      }
    });
  }
  function showInfo(data, tabletop) {
    var stores_arr = data.reduce(function (acc, item) {
      var obj = [];
      var key = item.thanh_pho;
      obj.type = item.dinh_dang;
      obj.address = item.dia_chi;
      obj.district = item.quan_huyen;
      obj.code = item.code;
      obj.grand_opening = item.khai_truong;
      if (!acc[key]) {
        acc[key] = [];
      };
      acc[key].push({
        grand_opening: obj.grand_opening,
        type: obj.type,
        address: obj.address,
        code: obj.code,
        district: obj.district
      });
      acc[key].sort(function (a, b) {
        var nameA = a.district.replace('quận ', '');
        var nameB = b.district.replace('quận ', '');
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return acc;
    }, {});
    var grand_openning_arr = data.filter(function (item) {
      return item.khai_truong;
    }).map(function (item) {
      return { city: item.thanh_pho, code: item.code, address: item.dia_chi, grand_opening: item.khai_truong, district: item.quan_huyen }
    });
    grand_openning_arr = grand_openning_arr.sort(function (a, b) {
      if (a.city.toLowerCase() == b.city.toLowerCase()) return 0;
      if (a.city.toLowerCase() == 'hồ chí minh') return -1;
      if (b.city.toLowerCase() == 'hồ chí minh') return 1;
      if (a.city.toLowerCase() == 'hà nội') return -2;
      if (b.city.toLowerCase() == 'hà nội') return 2;
      if (a.city.toLowerCase() < b.city.toLowerCase())
        return -1;
      if (a.city.toLowerCase() > b.city.toLowerCase())
        return 1;
      return 0;
    });
    store_generate(stores_arr);
    if (grand_openning_arr.length > 0) {
      grand_opening_generate(grand_openning_arr);
      var $set_default = $('#list-store .item').eq(0);
      $set_default.addClass('checked');
      generateMap($set_default.data('code'));
    } else {
      var setdefault = stores_arr["Hồ Chí Minh"][0];
      $('.select-city').val('Hồ Chí Minh').change();
      generateMap(setdefault.code)
    }
    $('.sectionContentStore').show();
    $('.cssload-loader').hide();
  };
  function changeStore(val, data) {
    var $liststore = $('#list-store');
    $liststore.html('');
    $.each(data[val], function (i, item) {
      var isGrandOpenning = item.grand_opening != '' ? 'date_openning' : 'hidden';
      var $item = '<div class="item" data-code="' + item.code + '"><i class="fa-map-marker fa"></i>'
        + '<div class="district">' + item.district + '</div>'
        + item.address
        + '</div>';
      $liststore.append($item)
    });
    $liststore.find('.item').click(function () {
      var $this = $(this);
      if (!$this.hasClass('unclick')) {
        $this.siblings().removeClass('checked');
        $this.addClass('checked');
        var code = $this.data('code');
        generateMap(code);
      }
    })
  };
  function generateMap(code) {
    var map = document.getElementById('map').innerHTML = code;
    return map;
  };
  function grand_opening_generate(data) {
    var $liststore = $('#list-store');
    $liststore.html('');
    $.each(data, function (i, item) {
      var $item = '<div class="item" data-code="' + item.code + '">'
        + '<div class="district"><i class="fa-map-marker fa"></i> ' + item.district + '<span class="date_openning">' + item.grand_opening + '</span></div>'
        + item.address
        + '</div>';
      $liststore.append($item)
    });
    $liststore.find('.item').click(function () {
      var $this = $(this);
      if (!$this.hasClass('unclick')) {
        $this.siblings().removeClass('checked');
        $this.addClass('checked');
        var code = $this.data('code');
        generateMap(code);
      }
    })
  };
  function store_generate(data) {
    var $selectcity = $('.select-city');
    var $liststore = $('#list-store');
    $.each(data, function (key, value) {
      $selectcity.append('<option value="' + key + '">' + key + '</option>');
    });
    $.each(data[$selectcity.val()], function (i, item) {
      var $item = '<div class="item">'
        + item.address
        + '</div>';
      $liststore.append($item)
    });
    changeStore($selectcity.val(), data);
    $(".select-city").change(function () {
      changeStore($(this).val(), data);
      var $set_default = $liststore.find('.item').eq(0);
      $set_default.addClass('checked');
      generateMap($set_default.data('code'))
    });
  };
// movetop
  $(document).ready(function () {
    $().UItoTop({ easingType: 'easeInOutCubic' });
    
});




