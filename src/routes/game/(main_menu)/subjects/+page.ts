import type { PageLoad } from './$types';
 
export const load = (async ({ fetch }) => {
    let res = await fetch("/api/subjects");
    let subjects = await res.json();
  return {
    subjects
  };
}) as PageLoad;