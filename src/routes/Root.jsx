import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form role="search" id="search-form">
            <input
              type="search"
              id="q"
              name="q"
              aria-label="Search contacts"
              placeholder="Search"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        {/* <nav>
          <ul>
            <li>
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav> */}
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((ctc) => (
                <li key={ctc.id}>
                  <Link to={`contacts/${ctc.id}`}>
                    {ctc.first || ctc.last ? (
                      <>
                        {ctc.first} {ctc.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {ctc.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
