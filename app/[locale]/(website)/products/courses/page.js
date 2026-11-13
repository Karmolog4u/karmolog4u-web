'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/Common/Container/Container';
import CoursesCheckboxes from '@/components/Products/Courses/CoursesCheckboxes';
import CoursesList from '@/components/Products/Courses/CoursesList';

const CoursesPage = () => {
  const [showWebinars, setShowWebinars] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showEthers, setShowEthers] = useState(false);

  useEffect(() => {
    setShowWebinars(() => {
      return JSON.parse(window.localStorage.getItem('showWebinars')) ?? true;
    });
    setShowTraining(() => {
      return JSON.parse(window.localStorage.getItem('showTraining')) ?? false;
    });
    setShowEthers(() => {
      return JSON.parse(window.localStorage.getItem('showEthers')) ?? false;
    });
  }, []);

  return (
    <Container>
      <CoursesCheckboxes
        showWebinars={showWebinars}
        setShowWebinars={setShowWebinars}
        showTraining={showTraining}
        setShowTraining={setShowTraining}
        showEthers={showEthers}
        setShowEthers={setShowEthers}
      />
      <CoursesList
        showWebinars={showWebinars}
        showTraining={showTraining}
        showEthers={showEthers}
      />
    </Container>
  );
};

export default CoursesPage;
