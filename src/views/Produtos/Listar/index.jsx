import axios from 'axios'
import { useState, useEffect } from 'react';

export default function Listar(){
    const url = "http://localhost:8080/produtos";
    const [produtos, setProdutos] = useState([]);

     /**  Formatando por função  */
     const formatar = (valor_form) => {
        return(
            new Intl.NumberFormat(
                'pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'}
            ).format(valor_form)
        );
    }

    /** Listar */
    useEffect( () => {
    axios.get(url)
        .then(res => {
            setProdutos(res.data)
        })
        .catch(error => {
            console.log("Error: " + error);
        })
    }, [produtos])

    return(
        <div>
            <h1>Lista de Produtos</h1>
             <table className="mt-3 table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>QTD</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { produtos.map((item, i) => (
                        <tr key={i}>
                        <td className="col-4 ">{item.nome}</td>
                        <td className="col-2">{ formatar(item.valor) }</td>
                        <td className="col-2 ">{item.qtd}</td>
                        <td className="col-2 ">{ formatar( item.valor * item.qtd ) }</td>
                        <td className="gap-space">
                            <button className="btn btn-outline-danger"> 
                                <i className="fa fa-trash"></i>
                            </button>
                            <button className="btn btn-outline-warning"> 
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}