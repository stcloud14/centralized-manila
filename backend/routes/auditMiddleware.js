
import conn1 from './connection1.js'


function auditMiddleware(req, res, next) {

    const { params, path, body } = req;

    const transaction_id = params.transaction_id;
    const user_id = params.user_id;

    let id_no = (transaction_id !== undefined && transaction_id !== null) ? transaction_id : user_id;

    const date = new Date();
    const timeStamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    let activity = '';
    let changes = '';

    switch (true) {
        case path.includes('process'):
          activity = 'Processing Transaction';
          changes ='Updated Status - Processing';
          break;
      
        case path.includes('complete'):
          activity = 'Completed Transaction';
          changes ='Updated Status - Complete';
        break;
        
        case path.includes('reject'):
          activity = 'Rejected Transaction';
          changes ='Updated Status - Rejected';
        break;
        
        case path.includes('approve'):
          activity = 'Approved Verification';
          changes ='Updated Status - Verified/Complete';
        break;
        
        case path.includes('decline'):
          activity = 'Declined Verification';
          changes ='Updated Status - Unverified/Declined';
        break;
          
    }
      

    let admin = '';

    switch (body && body.trans_type) {
    case 'Real Property Tax Payment':
    case 'Real Property Tax Clearance':
        admin = 'RPTAX ADMIN';
        break;

    case 'Business Permit':
        admin = 'BUS ADMIN';
        break;

    case 'Community Tax Certificate':
        admin = 'CTC ADMIN';
        break;

    case 'Birth Certificate':
    case 'Death Certificate':
    case 'Marriage Certificate':
        admin = 'LCR ADMIN';
        break;
    }

    
    const sql = "INSERT INTO audit_trail (`time_stamp`, `activity`, `admin`, `date`, `time`, `id_no`, `changes`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [timeStamp, activity, admin, formattedDate, formattedTime, id_no, changes];


    try {
        queryDatabase(sql, values);

    } catch (err) {
        console.error(err);
    }
    
    next();
}




function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        // Pass values as parameters to the query function
        conn1.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


export default auditMiddleware;