import { Link } from "@tanstack/react-router";

function EntryPage() {
  return <div><span>Entry</span>
  <Link to="/files">to files</Link></div>
}

export {
  EntryPage,
}