function getForm(starttimecombo,endtimecombo,allFieldShow)
{
	starttimecombo= eval(starttimecombo);
	endtimecombo= eval(endtimecombo);

	Ext.onReady(function(){
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget = 'side';

		var hostname = document.location.host;
		var starttime_combo= combobox('Start Time','starttime',['time','values'],starttimecombo,'time','values',100);
		var endtime_combo= combobox('End Time','endtime',['time','values'],endtimecombo,'time','values',100);
		var start_date= datefield('Start Date','DATE1',100);
		var end_date= datefield('End Date','DATE2',100);
		
        var curday    = new Date();
        var curhrconst= curday.getHours();
        var curhour   = curhrconst;

        if(curhour>12)
        {
            curhour     = curhour-12;
            var ampm    = 'PM';
        }
        else
        {
            var ampm    = 'AM';
        }

        var starthr = curhour;
        var endhr   = curhour+1;

		var setstarhrtval   = '';
		var setendhrtval    = '';

        starthr = starthr+':00';
        endhr   = endhr+':00';

        if(curhour==0)
        {
            starthr = '12:00 PM';
            endhr   = '1:00 AM';

            setstarhrtval   = curhour;
            setendhrtval    = '';
        }
        else if(curhour==12)
        {
            starthr = '12:00 AM';
            endhr   = '1:00 PM';

            setstarhrtval   = '';
            setendhrtval    = curhour+1;
        }
        else
        {
            starthr = starthr+' '+ampm;
            endhr   = endhr+' '+ampm;

            setstarhrtval   = curhrconst;
            setendhrtval    = curhrconst+1;
        }

        var report_form = new Ext.form.FormPanel({
	    labelWidth: 150,
	    buttonAlign: 'right',
	    frame:true,
	    formId:'report_form',
	    height: 400,
	    labelPad: 10,
	    items:[{
		layout:'column',	    
	    items:  [{
	        xtype:'fieldset',
	        style:'margin-left:20px;margin-top:10px;',
	        width:500,
	        title:'Select Required Fields',
	        autoHeight : true,
	        items:[{
					columnWidth:.5,
					style:'margin-left:20px;margin-top:10px;',
					layout: 'form',
					items: [
						start_date,
						starttime_combo,
						end_date,
						endtime_combo
					]
					}]
				}]    
			}],
		
			buttons:[
					{
					text: 'Submit',
					handler: function(){

						var okFlag=1;

						if(!isValidPeriod(start_date.value,end_date.value))
						{
							okFlag=0;
							Ext.Msg.alert("Report Error","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start date should be less than or equal to End date!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
						}

						if(okFlag==1)
						{
							submit_form()
						}
					  }
					},
					{
						text: 'Reset',
						handler: function(){
							starttime_combo.setValue("");
							endtime_combo.setValue("");
							start_date.setValue(new Date())
							end_date.setValue(new Date())
						}
					}
				]
			});

		var showhideButtonFrm= new Ext.Button({
			renderTo: 'divHideFrm',
			text: 'Show/Hide Form',
			handler: toggleForm
		});
		var showhideButtonRpt= new Ext.Button({
			renderTo: 'divHideRpt',
			text: 'Show/Hide Form',
			handler: toggleForm
		});

    	report_form.render('report_form_div');
		
		starttime_combo.setValue(starthr);
		endtime_combo.setValue(endhr);
		
		start_date.setValue(new Date());
		end_date.setValue(new Date());
		
		var startTimeDOM = document.getElementById('starttime');
		
		if(startTimeDOM)
			startTimeDOM.value=setstarhrtval;

		 var endTimeDOM = document.getElementById('endtime');
		
		if(endTimeDOM)
			endTimeDOM.value=setendhrtval;
		}

	);
}

function submit_form()
{

		var myColumnHeaders = [
			{id:"sno",header: "S.No", sortable: true, dataIndex: 'sno'},
			{id:"visitor Id",header: "VisitorID", sortable: true, dataIndex: 'visitorid'},
			{header: "Visitor Name", sortable: true, dataIndex: 'firstname',editor:grideditor()},
			{header: "To Meet", sortable: true, dataIndex: 'tomeet'},
			{header: "Company Name", sortable: true, dataIndex: 'companyname'},
			{header: "Coming From", sortable: true, dataIndex: 'comingfrom'},
			{header: "Email", width: 120, sortable: true, dataIndex: 'emailid',editor:grideditor()},
			{header: "Mobile", width: 120,sortable: true, dataIndex: 'mobile'},
			{header: "Check In", width: 120,sortable: true, dataIndex: 'checkin',editor:grideditor()},
			{header: "Check Out", width: 120,sortable: true, dataIndex: 'checkout',editor:grideditor()},
			{header: "Status", sortable: true, dataIndex: 'status'}
		];
	
		var myJsonMap= [
			{name:"sno",mapping:"sno"},
			{name:"visitorid",mapping:"visitorid"},
			{name:"firstname",mapping:"firstname"},
			{name:"tomeet",mapping:"tomeet"},
			{name:"companyname",mapping:"companyname"},
			{name:"comingfrom",mapping:"comingfrom"},
			{name:"emailid",mapping:"emailid"},
			{name:"mobile",mapping:"mobile"},
			{name:"checkin",mapping:"checkin"},
			{name:"checkout",mapping:"checkout"},
			{name:"status",mapping:"status"}
			
		];

	createExtjsGrid('report',myColumnHeaders,myJsonMap,'report_form','visitorpassresponse.php','sno');

	//getSaveAs('visitorpassresponse.php','report_form','savefile');
	}
