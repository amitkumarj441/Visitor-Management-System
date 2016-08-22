
function createExtjsGrid(divName,myColumnHeaders,myJsonMap,formName,dataurl,autoExpand)
{
    Ext.Ajax.timeout=3000000;
	toggleForm();
	Ext.fly('reportHolder').dom.innerHTML= '<div id='+divName+' style="border:1px solid #99bbe8;overflow: hidden; width: 100%; height: 400px;position:relative;left:0;top:0;"></div>';
	Ext.fly('savefile').dom.innerHTML= "";

	if(divName == 'report_full')
	{
		intPageSize= 25000;
	}
	else
	{
		intPageSize= 25;
	}
   // var ht=document.getElementById('reportFrame').style.height='100%';
   // alert(ht);
	var ds = new Ext.data.Store({
								proxy: new Ext.data.HttpProxy({
								url: dataurl,
								form:document.getElementById(formName),
								method:'POST'
							}),
	        				reader: new Ext.data.JsonReader({
	        									root: 'results',
												totalProperty: 'total',
												id: 'id',fields: myJsonMap})
				});
				

	var colModel = new Ext.grid.ColumnModel(myColumnHeaders);
	var grid = new Ext.grid.EditorGridPanel({
					        store: ds,
					        cm: colModel,
					        autoExpandColumn: autoExpand,
					        autoExpandMax:200,
                            autoScroll: true,
 					        loadMask: true,
                            renderTo: divName,
                            height:394,
					        bbar: new Ext.PagingToolbar({
					            pageSize: intPageSize,
					            store: ds,
					            displayInfo: true,
					            displayMsg: 'Displaying topics {0} - {1} of {2}',
					            emptyMsg: "No Records Found"
					        })

					    });

	// make the grid resizable, do before render for better performance
	// Prabu - Resizing may be turned on later
	var rz = new Ext.Resizable(divName, {
	    wrap:true,
        minHeight:100,
	    pinned:true,
	    handles: 's'
	});
	
	function myGridHandler() {
        var vs = Ext.getBody().getViewSize();
        gwidth = vs.width;
        rz.getEl().setSize(gwidth-50);
        grid.setSize(gwidth-50);
        grid.syncSize();
    }

    Ext.EventManager.onWindowResize(myGridHandler);

	ds.load({params:{start:0,limit:intPageSize}});
	grid.getView().refresh(true);

	function myResizeHandler() {
        var x = rz.getEl().getSize();
        x.height= x.height-10;
        grid.setSize(x);
        grid.syncSize();
     }
     rz.on('resize', myResizeHandler);
}

