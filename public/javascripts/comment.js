$(document).ready(function() {
  $("#comment").submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: window.location.pathname + "/comment",
      data: $("#comment").serialize(),
      dataType: "String",
      success: function(response) {
        //console.log("response");
        clearInputs();
        ShowCmt();
        //$( "#a" ).click();
      },
      error: function() {}
    });
  });

  $("#form1").submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: window.location.pathname + "/reply",
      data: $("#form1").serialize(),
      dataType: "json",
      success: function(response) {
        //console.log('response');
        clearInputs();
        Show();
        //$( "#a" ).click();
      },
      error: function() {}
    });
  });

  function ShowCmt() {
    // alert("Show");
    $.ajax({
      type: "GET",
      url: window.location.pathname + "/comment",
      dataType: "json",
      success: function(response) {
        console.log(response);
        var tbodyEl = $("tbody");

        tbodyEl.html("");

        response.forEach(function(cmt) {
          tbodyEl.append(
            "\
                 <tr>\
                 <td><h6>" +
              cmt.owner +
              "</h6></td>\
                 <td><p>" +
              cmt.comment +
              "</p></td>\
                 </tr>\
                 "
          );
        });
      },
      error: function() {}
    });
  }

  function clearInputs() {
    $("#txt").val("");
    $("#cmt").val("");
  }
});
