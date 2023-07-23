import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

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
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((ctc) => (
                <li key={ctc.id}>
                  <NavLink
                    to={`contacts/${ctc.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {ctc.first || ctc.last ? (
                      <>
                        {ctc.first} {ctc.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {ctc.favorite && <span>★</span>}
                  </NavLink>
                  {/* <Link to={`contacts/${ctc.id}`}>
                    {ctc.first || ctc.last ? (
                      <>
                        {ctc.first} {ctc.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {ctc.favorite && <span>★</span>}
                  </Link> */}
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
