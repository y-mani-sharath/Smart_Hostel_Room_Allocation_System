(function(){
  const keys=['students','rooms','allocations','suggestions','settings','activityLogs'];
  function createRooms(prefix,hostel,gender,code,type,count,floor,capacity){return Array.from({length:count},(_,index)=>{const number=String(index+1).padStart(2,'0'),roomNumber=`${floor}${number}`;return{id:`room-${prefix.toLowerCase()}-${code.toLowerCase()}-${number}`,roomId:`${prefix}-${code}-${number}`,roomNumber,hostel,floor,type,capacity,gender};});}
  const requestedRooms=[
    ...createRooms('FAG','Faculty / Guest','Staff / Guest only','S','Single Sharing',5,1,1),
    ...createRooms('MAP','Maple','Female','S','Single Sharing',5,1,1),
    ...createRooms('MAP','Maple','Female','D','Double Sharing',10,2,2),
    ...createRooms('MAP','Maple','Female','Q','Four Sharing',10,3,4),
    ...createRooms('OAK','Oak','Male','S','Single Sharing',5,1,1),
    ...createRooms('OAK','Oak','Male','D','Double Sharing',10,2,2),
    ...createRooms('OAK','Oak','Male','Q','Four Sharing',10,3,4)
  ];
  const defaults={
    students:[
      {id:'stu-101',studentId:'STU2026001',name:'Aarav Sharma',gender:'Male',department:'Computer Science',year:'2nd Year',phone:'+91 98765 43210',email:'aarav.sharma@campus.edu',hostel:'Cedar Hall',roomType:'Double Sharing',applicationDate:'2026-10-10',status:'Allocated'},
      {id:'stu-102',studentId:'STU2026002',name:'Maya Iyer',gender:'Female',department:'Business Administration',year:'1st Year',phone:'+91 98765 43211',email:'maya.iyer@campus.edu',hostel:'Maple House',roomType:'Triple Sharing',applicationDate:'2026-10-12',status:'Allocated'},
      {id:'stu-103',studentId:'STU2026003',name:'Dev Patel',gender:'Male',department:'Mechanical Engineering',year:'3rd Year',phone:'+91 98765 43212',email:'dev.patel@campus.edu',hostel:'Cedar Hall',roomType:'Double Sharing',applicationDate:'2026-10-14',status:'Pending'},
      {id:'stu-104',studentId:'STU2026004',name:'Ananya Rao',gender:'Female',department:'Computer Science',year:'2nd Year',phone:'+91 98765 43213',email:'ananya.rao@campus.edu',hostel:'Maple House',roomType:'Double Sharing',applicationDate:'2026-10-15',status:'Pending'},
      {id:'stu-105',studentId:'STU2026005',name:'Kabir Khan',gender:'Male',department:'Civil Engineering',year:'1st Year',phone:'+91 98765 43214',email:'kabir.khan@campus.edu',hostel:'Cedar Hall',roomType:'Four Sharing',applicationDate:'2026-10-17',status:'Pending'},
      {id:'stu-106',studentId:'STU2026006',name:'Isha Menon',gender:'Female',department:'Psychology',year:'4th Year',phone:'+91 98765 43215',email:'isha.menon@campus.edu',hostel:'Maple House',roomType:'Single Sharing',applicationDate:'2026-10-18',status:'Pending'},
      {id:'stu-107',studentId:'STU2026007',name:'Rohan Das',gender:'Male',department:'Computer Science',year:'2nd Year',phone:'+91 98765 43216',email:'rohan.das@campus.edu',hostel:'Any',roomType:'Triple Sharing',applicationDate:'2026-10-20',status:'Pending'}
    ],
    rooms:[
      {id:'room-201',roomId:'CED-101',roomNumber:'101',hostel:'Cedar Hall',floor:1,type:'Double Sharing',capacity:2,gender:'Male'},
      {id:'room-202',roomId:'CED-102',roomNumber:'102',hostel:'Cedar Hall',floor:1,type:'Double Sharing',capacity:2,gender:'Male'},
      {id:'room-203',roomId:'CED-204',roomNumber:'204',hostel:'Cedar Hall',floor:2,type:'Four Sharing',capacity:4,gender:'Male'},
      {id:'room-204',roomId:'MAP-110',roomNumber:'110',hostel:'Maple House',floor:1,type:'Triple Sharing',capacity:3,gender:'Female'},
      {id:'room-205',roomId:'MAP-208',roomNumber:'208',hostel:'Maple House',floor:2,type:'Double Sharing',capacity:2,gender:'Female'},
      {id:'room-206',roomId:'MAP-310',roomNumber:'310',hostel:'Maple House',floor:3,type:'Single Sharing',capacity:1,gender:'Female'},
      ...requestedRooms
    ],
    allocations:[
      {id:'alloc-301',studentId:'stu-101',roomId:'room-201',status:'Active',approvedAt:'2026-10-16T09:30:00.000Z'},
      {id:'alloc-302',studentId:'stu-102',roomId:'room-204',status:'Active',approvedAt:'2026-10-17T11:00:00.000Z'}
    ],
    suggestions:[
      {id:'sug-401',studentId:'stu-103',roomId:'room-202',score:83,reasons:['Room type preference matches','Preferred hostel matches','Room has available capacity','Earlier application date'],status:'Pending',createdAt:'2026-10-21T08:30:00.000Z'}
    ],
    settings:{hostels:['Cedar Hall','Maple House','Faculty / Guest','Maple','Oak'],weights:{roomType:40,hostel:30,availability:20,priority:10},inventoryVersion:1},
    activityLogs:[
      {id:'log-501',message:'Allocation approved for Maya Iyer',type:'allocation',createdAt:'2026-10-17T11:00:00.000Z'},
      {id:'log-502',message:'Allocation approved for Aarav Sharma',type:'allocation',createdAt:'2026-10-16T09:30:00.000Z'},
      {id:'log-503',message:'Recommendation generated for Dev Patel',type:'recommendation',createdAt:'2026-10-21T08:30:00.000Z'}
    ]
  };
  function read(key){try{const raw=localStorage.getItem(key);if(raw===null)return structuredClone(defaults[key]);const value=JSON.parse(raw);return value??structuredClone(defaults[key]);}catch(error){console.warn('Could not read localStorage key:',key,error);return structuredClone(defaults[key]);}}
  function write(key,value){localStorage.setItem(key,JSON.stringify(value));return value;}
  function uid(prefix){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);}
  function log(message,type='update'){const logs=read('activityLogs');logs.unshift({id:uid('log'),message,type,createdAt:new Date().toISOString()});write('activityLogs',logs.slice(0,80));}
  function migrateRequestedInventory(){const settings=read('settings');if(Number(settings.inventoryVersion)>=1)return;const rooms=read('rooms'),roomIds=new Set(rooms.map(room=>String(room.id))),labels=new Set(rooms.map(room=>String(room.roomId).toLowerCase()));requestedRooms.forEach(room=>{if(!roomIds.has(room.id)&&!labels.has(room.roomId.toLowerCase()))rooms.push(room);});write('rooms',rooms);settings.hostels=[...new Set([...(settings.hostels||[]),'Faculty / Guest','Maple','Oak'])];settings.inventoryVersion=1;write('settings',settings);}
  function initialize(){keys.forEach(key=>{if(localStorage.getItem(key)===null)write(key,structuredClone(defaults[key]));});migrateRequestedInventory();}
  window.HostelStore={keys,defaults,read,write,uid,log,initialize};
  initialize();
})();