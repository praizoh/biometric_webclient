var table = $('#dataTable').DataTable( {
    dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
    buttons: {
        buttons: [
            { extend: 'copy', className: 'btn' },
            { extend: 'csv', className: 'btn' },
            { extend: 'excel', className: 'btn' },
            { extend: 'print', className: 'btn' }
        ]
    },
    "oLanguage": {
        "oPaginate": { "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
        "sInfo": "Showing page _PAGE_ of _PAGES_",
        "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
        "sSearchPlaceholder": "Search...",
       "sLengthMenu": "Results :  _MENU_",
    },
    "stripeClasses": [],
    "lengthMenu": [7, 10, 20, 50],
    "pageLength": 7 ,
    
} );
table.order( [ 3, 'desc' ] ).draw();


var view_data = new ViewData();
getAttendance()

function getAttendance(){
    var view_data = new ViewData();

    var settings = {
        "url": `https://biometrics-app.herokuapp.com/attendance`,
        "method": "GET",
        "timeout": 0,
        "headers": {
        "Content-Type": "application/json"
        },
        success: function(data) {
            console.log(data)
            Snackbar.show({
                text: `Attendance fetched`,
                actionTextColor: '#fff',
                backgroundColor: '#1cc88a',
                pos: 'top-right'
            }); 
            table.clear().draw();
            
            var result = data.data
            console.log(result)
            for(i = 0; i<result.length; i++){
                let clocker =  result[i]['clock_in']
                clockIn = moment(result[i]['clock_in']).format('h:mm:ss a')
                result[i]['clock_in'] =  clockIn
                result[i]['attendanceDay'] = moment(clocker).format('MMMM Do YYYY')

                let clockOut =  result[i]['clock_out']
                if(clockOut){
                    clockOut = moment(clockOut).format('h:mm:ss a')
                    result[i]['clock_out'] =  clockOut
                }else{
                    result[i]['clock_out'] =  "--:--"
                }
                

                table.row.add( [
                    result[i]['name'],
                    result[i]['employee_id'],
                    result[i]['phone_number'],
                    result[i]['attendanceDay'],
                    result[i]['clock_in'],
                    result[i]['clock_out']
                ] ).draw( false );
            }
            

           
        },
        error: function(data){
            Snackbar.show({
                text: `${data["responseJSON"]["message"]}`,
                actionTextColor: '#fff',
                backgroundColor: '#e7515a',
                pos: 'top-right'
            }); 
        },
        complete: function(jqXHR) {
            if (jqXHR.status != '200') {                
                // window.location.replace("index.html");
            }
        }
    };

    $.ajax(settings).done(function (response) {
    });
}