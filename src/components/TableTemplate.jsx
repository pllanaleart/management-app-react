import "./TableTemplate.css";

function TableTemplate({ tableHeaders, tableData }) {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((headerTitle) => {
            return <th>{headerTitle}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableTemplate;
