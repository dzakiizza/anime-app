import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";

const StyledPaginateContainer = styled.div<{
  borderColor: string;
  hoverColor: string;
  linkPadding: string;
}>`
  .pagination {
    color: #38b2ac;
    display: flex;
    gap: 20px;
    list-style-type: none;
    align-items: center;
    height: 60px;
  }
  .nextLinkClassName,
  .previousLinkClassName,
  .pageLinkClassName {
    padding: ${(props) => props.linkPadding};
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 8px;
  }
  .nextLinkClassName:hover,
  .previousLinkClassName:hover,
  .pageLinkClassName:hover {
    background-color: ${(props) => props.hoverColor};
  }
  .disabledClassName,
  .disabledLinkClassName {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .activeLinkClassName,
  .activeLinkClassName:hover {
    background-color: #38b2ac;
    color: white;
    border: 0px;
  }
  .break-me {
    cursor: default;
  }
`;

const Pagination = ({
  initialSelected,
  pageCount,
  onClick,
}: {
  initialSelected?: number;
  pageCount: number;
  onClick: ({ selected }: { selected: number }) => void;
}) => {
  const borderColor = useColorModeValue("#E2E8F0", "#2D3748");
  const hoverColor = useColorModeValue("#EDF2F7", "#2D3748");

  const linkPadding = useBreakpointValue(
    { base: "12px", md: "16px" },
    { ssr: false }
  );
  return (
    <StyledPaginateContainer
      borderColor={borderColor}
      hoverColor={hoverColor}
      linkPadding={linkPadding || "16px"}
    >
      <ReactPaginate
        pageCount={pageCount || 0}
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
        breakLabel={""}
        breakClassName="break-me"
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="pageLinkClassName"
        previousLinkClassName="previousLinkClassName"
        nextLinkClassName="nextLinkClassName"
        disabledLinkClassName="disabledLinkClassName"
        disabledClassName="disabledClassName"
        activeLinkClassName="activeLinkClassName"
        nextLabel={<ChevronRightIcon fontSize="20px" />}
        previousLabel={<ChevronLeftIcon fontSize="20px" />}
        initialPage={initialSelected}
        onPageChange={(e) => {
          onClick(e);
        }}
      />
    </StyledPaginateContainer>
  );
};

export default Pagination;
