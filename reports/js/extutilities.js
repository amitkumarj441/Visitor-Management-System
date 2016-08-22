function textfield(tv_label,tv_name,tv_width)
{
	var tf = new Ext.form.TextField({
        fieldLabel: tv_label,
        name: tv_name,
        id: tv_name,
        width: tv_width
    });
    return tf;
}

function hidetextfield(tv_label,tv_name,tv_width)
{
	var dtf = new Ext.form.TextField({
        fieldLabel: tv_label,
        name: tv_name,
        id: tv_name,
        width: tv_width,
        readOnly:true
    });
    return dtf;
}

function datefield(tv_label,tv_name,tv_width)
{
	 var df = new Ext.form.DateField({
	        fieldLabel: tv_label,
	        name: tv_name,
	        width:90,
	        allowBlank:false,
			format:'j/n/Y',
			readOnly:true
	    });
	    return df;
}

function combobox(tv_label,tv_name,tv_fields,tv_data,tv_displayfield,tv_valuefield,tv_width)
{
	var cb= new Ext.form.ComboBox({
			fieldLabel: tv_label,
			hiddenName: tv_name,
			store: new Ext.data.SimpleStore({
				fields: tv_fields,
				data : tv_data
			}),
			displayField:tv_displayfield,
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Select',
			selectOnFocus:true,
			valueField:tv_valuefield,
			width:tv_width,
			readOnly:true
	});
	return cb;
}

function multiselect(tv_label,tv_name,tv_fields,tv_data,tv_displayfield,tv_valuefield,tv_width,tv_height)
{
    var ms= new Ext.ux.Multiselect({
            fieldLabel: tv_label,
            hiddenName: tv_name,
            id: tv_name,
            name: tv_name,
			store: new Ext.data.SimpleStore({
				fields: tv_fields,
				data : tv_data
			}),
			displayField:tv_displayfield,
			valueField:tv_valuefield,
            width: tv_width,
            height: tv_height,
            isFormField:true
    });
    return ms;
}


function comboboxremote(tv_label,tv_name,ds)
{
	var cb= new Ext.form.ComboBox({
			fieldLabel: tv_label,
			hiddenName: tv_name,
            store: ds,
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			emptyText:'Select',
			loadingText:'Loading Data..',
			displayField:'name',
			valueField:'value',
			selectOnFocus:true,
			width:200,
			readOnly:true
	});
	return cb;
}




function checkbox(tv_label,tv_name,tv_checked,tv_value)
{
	var chb = new Ext.form.Checkbox({
		fieldLabel: tv_label,
		name: tv_name,
		checked:tv_checked,
		inputValue:tv_value
	});
	return chb;
}

function radio(tv_label,tv_name,tv_checked,tv_value)
{
	var rdb = new Ext.form.Radio({
		fieldLabel: tv_label,
		name: tv_name,
        checked:tv_checked,
		inputValue:tv_value
	});
	return rdb;
}


function toggleForm()
{
	if(document.getElementById("reportFormFrame").style.visibility=="hidden")
	{
		document.getElementById("reportFormFrame").style.visibility="visible";

	}
	else
	{
		document.getElementById("reportFormFrame").style.visibility="hidden";

	}
}
function toggleFormList()
{
	 var xComboList = YAHOO.util.Dom.getElementsByClassName('x-combo-list ux-mselect-valid');

	if(document.getElementById("reportFormFrame").style.visibility=="hidden")
	{
		  for(var i=0; i<xComboList.length; i++)
		  {
		   xComboList[i].style.visibility='visible';
		  }
		 document.getElementById("reportFormFrame").style.visibility="visible";
      
	}
	else
	{
		  for(var i=0; i<xComboList.length; i++)
		  {
		   xComboList[i].style.visibility='hidden';
		  }
		
		document.getElementById("reportFormFrame").style.visibility="hidden";
		}
}

function toggleSummaryForm()
{
	if(document.getElementById("summaryFrame").style.visibility=="hidden")
	{
		document.getElementById("summaryFrame").style.visibility="visible";

	}
	else
	{
		document.getElementById("summaryFrame").style.visibility="hidden";
	}
}

function getSaveAs(url,inputformid,savefiledivid)
{   Ext.Ajax.timeout=3000000;
	Ext.Ajax.request({
	url : url , 
	params:{saveas:true},
	form:document.getElementById(inputformid),
	method: 'POST',
	success: function ( result, request ) { 
      
		document.getElementById(savefiledivid).innerHTML= result.responseText;
	},
	failure: function ( result, request) { 
		Ext.MessageBox.alert('Failed', 'Sorry! Unable to retrieve save file option');
	} 
});
}

function getsummary(url,inputformid,summarydivid)
{
    Ext.Ajax.timeout=3000000;
    Ext.Ajax.request({
	url : url ,
	params:{summary:true},
	form:document.getElementById(inputformid),
	method: 'POST',
	success: function ( result, request ) {

		showSummary(result.responseText);
	},
	failure: function ( result, request) {
		Ext.MessageBox.alert('Failed', 'Sorry! no summary data available ');
	}
});
}

function isValidEmailID(emailid)
{
	if ((emailid != "") && (!(emailid.match(/^[a-zA-Z0-9][\s\w\.-]*[\sa-zA-Z0-9\s]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/))))
		return false;
	else
		return true;
}

function validatePhone(areaCode)
{
	if ((areaCode != "") && (!((areaCode.match(/^[\d\s]$/)) || (areaCode.match(/^[\d\s][\s\d,]*[\d\s]$/)))))
		return false;
	else
		return true;
}

function isValidPeriod(d1,d2)
{
	if ((d1=="DD/MM/YYYY") && (d2!="DD/MM/YYYY"))
		return false;

	if ((d1!="DD/MM/YYYY") && (d2=="DD/MM/YYYY"))
		return true;
	
	if (d1.match(/\//))
		var arrD1= d1.split('/');
	else
		var arrD1= d1.split('-');
	
	var date1= new Date();
	date1.setFullYear(arrD1[2],arrD1[1]-1,arrD1[0]);

	if (d2.match(/\//))
		var arrD2= d2.split('/');
	else
		var arrD2= d2.split('-');

	var date2= new Date();
	date2.setFullYear(arrD2[2],arrD2[1]-1,arrD2[0]);

	if (date1>date2)
		return false;
	else
		return true;
}

function limitDays(d1,d2,numdays)
{
	if ((d1=="DD/MM/YYYY") && (d2!="DD/MM/YYYY"))
		return false;

	if ((d1!="DD/MM/YYYY") && (d2=="DD/MM/YYYY"))
		return true;
	
	if (d1.match(/\//))
		var arrD1= d1.split('/');
	else
		var arrD1= d1.split('-');
	
	var date1= new Date();
	date1.setFullYear(arrD1[2],arrD1[1]-1,arrD1[0]);

	if (d2.match(/\//))
		var arrD2= d2.split('/');
	else
		var arrD2= d2.split('-');

	var date2= new Date();
	date2.setFullYear(arrD2[2],arrD2[1]-1,arrD2[0]);
	var one_day=1000*60*60*24;
	if (Math.ceil((date2-date1)/one_day)>numdays-1)
		return false;
	else
		return true;
}

function grideditor()
{
var ge= new Ext.grid.GridEditor(new Ext.form.TextField({
               allowBlank: false,
               readOnly: true
           }));
return ge;
}

function isValidDiff1(d1,d2,numdays)
{	

	if ((d1=="DD/MM/YYYY") && (d2!="DD/MM/YYYY"))
		return false;

	if ((d1!="DD/MM/YYYY") && (d2=="DD/MM/YYYY"))
		return true;
	
	if (d1.match(/\//))
		var arrD1= d1.split('/');
	else
		var arrD1= d1.split('-');
	
	var date1= new Date();
	date1.setFullYear(arrD1[2],arrD1[1]-1,arrD1[0]);

	if (d2.match(/\//))
		var arrD2= d2.split('/');
	else
		var arrD2= d2.split('-');

	var date2= new Date();
	date2.setFullYear(arrD2[2],arrD2[1]-1,arrD2[0]);
	var one_day=1000*60*60*24;
	var one_week=1000*60*60*24*7;
	if(numdays == 2){
		if (Math.ceil((date2-date1)/one_day)>numdays-1)
				return false;
			else
				return true;
	} else if(numdays == 8){
		if (Math.ceil((date2-date1)/one_week)>numdays-7)
				return false;
			else
				return true;
		}
}
