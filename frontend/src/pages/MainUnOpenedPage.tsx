import React from 'react';
import { useParams } from 'react-router-dom';

export default function MainUnOpenedPage() {
  const { id } = useParams();
  console.log(id);

  return <div>MainUnOpenedPage</div>;
}