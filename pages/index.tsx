import fs from "fs/promises";
import path from "path"
import styles from '../styles/Home.module.css'
import { GetStaticPropsContext } from 'next'
import React from 'react'
import Link from "next/Link"

interface Props{
  products:[{
    id:string;
    title:string;
  }];
}
interface ParseData {
    products:object[]
}
const Home:React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      {props.products.map(el => <Link key={el.id} href={"#"}>{el.title}</Link>)}
    </div>
  )
}

export const getStaticProps = async (context:GetStaticPropsContext) => {
  console.log("Validating")
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
  const jsonData = await fs.readFile(filePath);
  const data : ParseData = JSON.parse(`${jsonData}`);
  if(!data) {
    return {
      redirect : {
        destination :"/no"
      }
    }
  }
  if(data.products.length === 0) {
    return {
      notFound:true
    }
  }

return {
  props:  {
    "products": data.products
  },
  revalidate:10,
  
}
}

export default Home
