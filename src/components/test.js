<table className="table">
  <thead>
    <tr>
      <th scope="col">Teacher Name</th>
      <th scope="col">User ID</th>
      <th scope="col">Class</th>
      <th scope="col">Section</th>
      <th>Setting</th>
    </tr>
  </thead>
  <tbody>
    {this.state.teacherList.map((obj) => (
      <tr key={obj.userid}>
        <td className="first-row-item">{obj.username}</td>
        <td>{obj.userid}</td>
        <td>{obj.class}</td>
        <td>{obj.section}</td>
        <td>
          <Link
            to={`/user/admin/editTeacher/${obj.userid}`}
            className="btn btn-dark mx-1 my-1"
          >
            Update
          </Link>
          <button
            type="button"
            className="btn btn-dark mx-1 my-1"
            data-bs-toggle="modal"
            data-bs-target={`#cssid${obj.userid}`}
          >
            Delete
          </button>{" "}
        </td>
      </tr>
    ))}
  </tbody>
</table>;
