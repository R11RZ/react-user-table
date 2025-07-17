import "./Pagination.css";

const PaginationValue = [5, 10, 15, 30, 50];

const Pagination = ({
  setSkip,
  setInPage,
  limit,
  skip,
  total_users,
}) => {
  console.log(total_users);
  return (
    <div className="Pagination-Wrapper">
      <button
        onClick={() => (skip - limit >= 0 ? setSkip(skip - limit) : null)}
        className={(skip - limit >= 0) ? "Pagination-btn" : "Pagination-btn-deactive"  }
      >
        ←
      </button>
      <select
        className="Pagination-Select"
        value={limit}
        onChange={(e) => setInPage(e.target.value)}
      >
        {PaginationValue.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
      <button
        onClick={() =>
          skip + limit < total_users ? setSkip(skip + limit) : null
        }
        className={(skip + limit <= total_users) ? "Pagination-btn" : "Pagination-btn-deactive"  }
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
