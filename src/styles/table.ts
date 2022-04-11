import styled from 'styled-components';

export const TableStyle = styled.div`
  display: block;
  padding-bottom: 50px;
  .table {
    width: 100%;
    .thead {
      position: sticky;
      top: 0px;
      color: #fff;
      .tr {
        border-bottom: 2px solid black;
      }
      .th{
        background: #42444e;
      }
      [data-sticky-last-left-td]{
        z-index: 4 !important;
        
      }
      
    }
    .tbody {
      .tr {
        min-height: 100px;
        
        &:nth-child(odd) {
          .td{
          background: #d3d3d3;
          opacity: 1;
        }}
        &:nth-child(even) {
          .td{
            background: #888888;
          }
          
        }
      }
      .td{
        z-index: -2 ;
      }
      [data-sticky-td]{
        z-index: -1 !important;
      }
    }
    .tfoot {
      position: sticky;
      bottom: 0;
      .tr {
        
        color: #fff;
        min-height: 50px;
        z-index:1;
      }
      .td{
        z-index: -2 ;
        background: #42444e;
      }
      [data-sticky-td]{
        z-index: -1 !important;
      }
    }
  }
  .net,
  .advanced,
  .shooting {
    .td {
      white-space: pre;
      padding: 3px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 16px;
      font-weight: bold;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .total {
    .td {
      white-space: pre;
      padding: 3px 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 12px;
      font-weight: 600;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      a {
        color: white;
      }
    }
    
    
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    overflow-x: scroll;
    .table {
      width: 1000px;
      
    }
    .net,
  .advanced,
  .shooting {
    .td {
      white-space: pre;
      padding: 3px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 12px;
      font-weight: bold;
      font-family: tahoma;
    }
    .td, .th{
      flex-grow: 1 !important;
    }
  }
}
`;
