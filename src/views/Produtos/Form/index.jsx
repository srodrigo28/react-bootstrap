import { useRef } from "react";
import axios from "axios";

export function Form(){
    const ref = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produto = ref.current;

        if (!produto.nome.value || !produto.qtd.value || !produto.valor) {
            return alert("Preencher todos os campos!");
        }
        
        await axios
            .post("http://localhost:8080/produtos", {
                nome: produto.nome.value,
                qtd: produto.qtd.value,
                valor: produto.valor.value,
            })
            .then(({ data }) => alert("Cadastrado com sucesso"))
            .catch(({ data }) => console.log(data));

            produto.nome.value = "";
            produto.qtd.value = "";
            produto.valor.value = "";
    };

    return(
        <div>
            <form className="mb-5" ref={ref} onSubmit={handleSubmit}>
                <h1 className="mb-3">Cadastrar</h1>
                <div className="row">
                    <div className="col-6">
                        <input type="text"  name="nome" className="form-control" placeholder="nome" />
                    </div>
                    <div className="col-2">
                        <input type="text"  name="qtd" className="form-control" placeholder="qtd"/>
                    </div>
                    <div className="col-2">
                        <input type="text"  name="valor" className="form-control" placeholder="valor" />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success ">Adicionar</button>
                        <button type="reset" className="btn btn-danger">Limpar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}