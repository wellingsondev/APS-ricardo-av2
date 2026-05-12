import streamlit as st
import requests
import pandas as pd

API_URL = "http://127.0.0.1:8000/api"

st.set_page_config(
    page_title="Sistema de Vendas",
    page_icon="🛒",
    layout="wide"
)

if "token" not in st.session_state:
    st.session_state.token = ""

if "logado" not in st.session_state:
    st.session_state.logado = False

if "username" not in st.session_state:
    st.session_state.username = ""


def headers():
    return {"Authorization": f"Bearer {st.session_state.token}"}


def req_get(url):
    return requests.get(url, headers=headers())


def req_post(url, data):
    return requests.post(url, json=data, headers=headers())


def req_put(url, data):
    return requests.put(url, json=data, headers=headers())


def req_delete(url):
    return requests.delete(url, headers=headers())


if not st.session_state.logado:

    col1, col2, col3 = st.columns([1, 2, 1])

    with col2:

        st.title("Login")

        with st.form("login"):

            username = st.text_input("Usuário")
            password = st.text_input("Senha", type="password")

            entrar = st.form_submit_button("Entrar")

            if entrar:

                r = requests.post(
                    f"{API_URL}/login/",
                    json={"username": username, "password": password}
                )

                if r.status_code == 200:

                    data = r.json()

                    st.session_state.token = data["access"]
                    st.session_state.logado = True
                    st.session_state.username = username

                    st.rerun()

                else:
                    st.error("Login inválido")

else:

    st.sidebar.title("Sistema")
    st.sidebar.write(st.session_state.username)

    menu = st.sidebar.radio(
        "Menu",
        ["Dashboard", "Funcionários", "Clientes", "Produtos", "Vendas"]
    )

    if st.sidebar.button("Sair"):
        st.session_state.logado = False
        st.session_state.token = ""
        st.rerun()


    if menu == "Dashboard":

        st.title("Dashboard")

        c = req_get(f"{API_URL}/clientes/").json()["results"]
        p = req_get(f"{API_URL}/produtos/").json()["results"]
        v = req_get(f"{API_URL}/vendas/").json()["results"]

        col1, col2, col3 = st.columns(3)

        col1.metric("Clientes", len(c))
        col2.metric("Produtos", len(p))
        col3.metric("Vendas", len(v))


    elif menu == "Funcionários":

        st.title("Funcionários")

        with st.expander("Novo"):

            with st.form("f"):

                username = st.text_input("Login")
                password = st.text_input("Senha")
                nome = st.text_input("Nome")
                idade = st.number_input("Idade", min_value=1)
                cargo = st.text_input("Cargo")

                if st.form_submit_button("Salvar"):

                    r = req_post(f"{API_URL}/funcionarios/", {
                        "username": username,
                        "password": password,
                        "nome": nome,
                        "idade": idade,
                        "cargo": cargo
                    })

                    st.rerun()

        data = req_get(f"{API_URL}/funcionarios/").json()["results"]

        for d in data:

            with st.container(border=True):

                st.write(d)

                if st.button("Excluir", key=f"f{d['id']}"):
                    req_delete(f"{API_URL}/funcionarios/{d['id']}/")
                    st.rerun()


    elif menu == "Clientes":

        st.title("Clientes")

        with st.expander("Novo"):

            with st.form("c"):

                nome = st.text_input("Nome")
                email = st.text_input("Email")
                telefone = st.text_input("Telefone")

                if st.form_submit_button("Salvar"):

                    req_post(f"{API_URL}/clientes/", {
                        "nome": nome,
                        "email": email,
                        "telefone": telefone
                    })

                    st.rerun()

        data = req_get(f"{API_URL}/clientes/").json()["results"]

        for d in data:

            with st.container(border=True):

                st.write(d)

                if st.button("Excluir", key=f"c{d['id']}"):
                    req_delete(f"{API_URL}/clientes/{d['id']}/")
                    st.rerun()


    elif menu == "Produtos":

        st.title("Produtos")

        with st.expander("Novo"):

            with st.form("p"):

                nome = st.text_input("Nome")
                descricao = st.text_input("Descrição")
                preco = st.number_input("Preço", min_value=0.0)
                estoque = st.number_input("Estoque", min_value=0)

                if st.form_submit_button("Salvar"):

                    req_post(f"{API_URL}/produtos/", {
                        "nome": nome,
                        "descricao": descricao,
                        "preco": preco,
                        "estoque": estoque
                    })

                    st.rerun()

        data = req_get(f"{API_URL}/produtos/").json()["results"]

        for d in data:

            with st.container(border=True):

                st.write(d)

                if st.button("Excluir", key=f"p{d['id']}"):
                    req_delete(f"{API_URL}/produtos/{d['id']}/")
                    st.rerun()


    elif menu == "Vendas":

        st.title("Vendas")

        clientes = req_get(f"{API_URL}/clientes/").json()["results"]
        produtos = req_get(f"{API_URL}/produtos/").json()["results"]

        map_c = {f"{c['id']} - {c['nome']}": c["id"] for c in clientes}
        map_p = {f"{p['id']} - {p['nome']}": p["id"] for p in produtos}

        cliente = st.selectbox("Cliente", list(map_c.keys()))

        qtd_itens = st.number_input("Qtd produtos", min_value=1, max_value=5)

        itens = []

        for i in range(qtd_itens):

            prod = st.selectbox(
                f"Produto {i+1}",
                list(map_p.keys()),
                key=i
            )

            qtd = st.number_input(
                f"Qtd {i+1}",
                min_value=1,
                key=f"q{i}"
            )

            itens.append({
                "produto": map_p[prod],
                "quantidade": qtd
            })

        if st.button("Finalizar Venda"):

            req_post(f"{API_URL}/vendas/", {
                "cliente": map_c[cliente],
                "itens": itens
            })

            st.rerun()

        vendas = req_get(f"{API_URL}/vendas/").json()["results"]

        st.dataframe(pd.DataFrame(vendas))