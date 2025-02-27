// Hook Imports
import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

// Service Imports 
import * as hootService from './services/hootService';

// Component Imports
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';
import CommentForm from './components/CommentForm/CommentForm';

// Context Imports
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [hoots, setHoots] = useState([]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots(prev => [newHoot, ...prev])
    navigate('/hoots');
  };

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate('/hoots');
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
            <Route path='/hoots/:hootId' element={<HootDetails handleDeleteHoot={handleDeleteHoot} />} />
            <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot} />} />
            <Route path='/hoots/:hootId/edit' element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
            <Route path='/hoots/:hootId/comments/:commentId/edit' element={<CommentForm />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
