import { Container, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdHomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/admin");
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Card>
        <Card.Body>
          <h2>User List</h2>
          <div style={{display:'flex',justifyContent:'end', marginBottom:'5rem'}}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
          />
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* Add more table cells for additional user data */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdHomeScreen;









// import { Container, Card, Table } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdHomeScreen = () => {
//   const [users,setUsers] = useState([]);
 
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/admin");
//         console.log(response.data.users)
//         setUsers(response.data.users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <Container>
//       <Card>
//         <Card.Body>
//           <h2>User List</h2>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 {/* Add more table headings as needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user,index) => (
//                 <tr key={user._id}>
//                   <td>{index+1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   {/* Add more table cells for additional user data */}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AdHomeScreen
