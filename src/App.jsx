import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home/Home";
import EmployeesList from "./pages/Employees/EmployeesList";
import DepartmentsList from "./pages/Departments/DepartmentsList";
import SubTeamsList from "./pages/SubTeams/SubTeamsList";
import RolesTitlesList from "./pages/RolesTitles/RolesTitlesList";
import TrainingCatalogueList from "./pages/TrainingCatalogue/TrainingCatalogueList";
import LearningPathsList from "./pages/LearningPaths/LearningPathsList";
import AssignmentsList from "./pages/Assignments/AssignmentsList";
import LiveSessionsList from "./pages/LiveSessions/LiveSessionsList";
import MyTrainingsList from "./pages/MyTrainings/MyTrainingsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route
          path="/home"
          element={
    
              <Home />
          
          }
        />

        <Route
  path="/departments"
  element={
 
      <DepartmentsList />
   
  }
/>

<Route
  path="/sub-teams"
  element={

      <SubTeamsList />

  }
/>

<Route
  path="/roles-titles"
  element={
  
      <RolesTitlesList />
  
  }
/>

        <Route
          path="/employees"
          element={

              <EmployeesList />
         
          }
        />

        <Route
  path="/training-catalogue"
  element={

      <TrainingCatalogueList />

  }
/>

<Route
  path="/learning-paths"
  element={
    
      <LearningPathsList />

      
    
  }
/>

<Route
  path="/my-trainings"
  element={
   
      <MyTrainingsList />
  
  }
/>

<Route
  path="/assignments"
  element={
   
      <AssignmentsList />
  
  }
/>

<Route
  path="/live-sessions"
  element={

      <LiveSessionsList />
     
  }
/>

 <Route path="/login" element={<LoginPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;



/**
  <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<Signup />} />

 */