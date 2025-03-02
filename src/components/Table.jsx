import React, { useMemo } from "react";
import "./Table.css";
import EMPLOYS_DATA from "./MOCK_DATA.json";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Table() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "user_name",
        header: "Name",
        Cell: ({ row }) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar src={row.original.user_image} alt={row.original.user_image} className="avatar" />
            <span>{row.original.user_name}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) => {
          const status = row.original.status;
          return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
        },
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "teams",
        header: "Teams",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: EMPLOYS_DATA,
    enableRowSelection: true,
    getRowId: (row) => row.email,
    enableStickyHeader: true,
    enableStickyFooter: true,
    muiTableContainerProps: {
      sx: { maxHeight: "500px" },
    },
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      variant: "outlined",
      shape: "rounded",
      showFirstButton: false,
      showLastButton: false,
    },
    renderBottomToolbar: ({ table }) => {
      const currentPage = table.getState().pagination.pageIndex + 1;
      const totalPages = table.getPageCount();

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {/*Prev Button  */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              style={{
                padding: "8px 12px",
                background:"	#E5E4E2",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: table.getCanPreviousPage() ? "pointer" : "not-allowed",
              }}
            >
              Prev
            </button>
          </div>

          {/*  Page Numbers in Center */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => table.setPageIndex(index)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: currentPage === pageNumber ? "#1976D2" : "white",
                    color: currentPage === pageNumber ? "white" : "black",
                    border: "1px solid #1976D2",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              style={{
                padding: "8px 12px",
                color: "#000",
                border: "none",
               background:"	#E5E4E2",
                borderRadius: "5px",
                cursor: table.getCanNextPage() ? "pointer" : "not-allowed",
              }}
            >
              Next
            </button>
          </div>
        </div>
      );
    },
  });

  return (
    <div className="main_container">
      <MaterialReactTable table={table} />
    </div>
  );
}

export default Table;
