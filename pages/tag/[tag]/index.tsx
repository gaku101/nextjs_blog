import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from "next"

const Index: NextPage = () => {
  const router = useRouter()
  const { tag } = router.query;
  console.log({tag});

  return <h2>/tag/: {tag}</h2>;
};

export default Index;

