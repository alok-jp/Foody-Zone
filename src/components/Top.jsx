import styled from 'styled-components';


const Top = ({searchFood}) => {
  return (
    <Container>
        <div className='header'>
        <div className='top_part'>
            <div className='logo'>
                <img src="/images/logo.svg" alt="logo" />
        </div>
        <div className='search'>
            <input onChange={searchFood} type="text" placeholder='Search Food...' />
        </div>
        </div>
         </div>
        

    </Container>
  )
}

export default Top


const Container = styled.div`


    .top_part{
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .header{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        padding:50px 120px;
        background: #363636;
    }

    .search{
        
        
        input{
            background-color: transparent;
            all:unset;
            border:1px solid var(--red);
            font-weight: 400;
            font-size: 16px;
            width: 250px;
            height: 35px;
            border-radius: 5px;
            padding: 5px 10px;
            color: white;
        }
        
        
    }
`;

