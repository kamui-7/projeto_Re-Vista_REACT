import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import Produto from '../../../../models/Produto';
import useLocalStorage from 'react-use-localstorage';
import { listar } from '../../../../services/Service';
import User from '../../../../models/User';


function ListaProdutosDoador() {
    const { id } = useParams<{id: string}>();
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [token] = useLocalStorage('token')
    const [dataUser] = useLocalStorage('user')
    const userLogado = JSON.parse(dataUser);
    const [user, setUser] = useState<User[]>([])
    let navigate = useNavigate();

    useEffect(() => {
        if (token == '') {
            alert("Conecte-se novamente para verificar doações disponíveis")
            navigate("/login")
        }
    }, [token])

    async function getProduto() {
        await listar(`/api/Produtos/id/empresas/${id}`, setProdutos, {
            headers: {
                'Authorization': token
            }
        })
    }
    useEffect(() => {
        getProduto()
    }, [produtos.length])
    
    if (produtos.length <1) {
        return (
            <>
            <Typography variant='h1'>Nenhuma doação disponível </Typography>
            </>
        )
    }
    return (
        <section id='lista_produtos'>
            {
                produtos.map(produto => (
                    <article>
                            <figure>
                                <img src={produto.urL_Imagem} alt="Imagem do produto" />
                            </figure>
                            <div>
                                <header>

                                    <h2>{produto.titulo}</h2>

                                </header>
                                <footer>
                                    <p>
                                        {produto.descricao}
                                    </p>
                                    <div>
                                        <Link to={`/produtos/${produto.id}`} className='decorator' >
                                            <button>Visualizar produto na vitrine</button>
                                        </Link>
                                        <h3>
                                            Qtd: {produto.qtdLimite}
                                        </h3>

                                    </div>
                                </footer>
                            </div>
                    </article>
                ))
            }
        </section>
    )



}

export default ListaProdutosDoador;