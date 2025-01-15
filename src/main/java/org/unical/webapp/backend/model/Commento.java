package org.unical.webapp.backend.model;

import java.util.List;

public class Commento {

  protected int id_commento;
  protected int id_contenuto_api;
  protected boolean is_serie;
  protected String contenuto;
  protected int voto;
  protected String username_utente;
  protected int commento_risposto;

  protected List<Commento> risposte;

  public Commento(int id_commento, int id_contenuto_api, boolean is_serie, String contenuto, int voto, String username_utente, int commento_risposto, List<Commento> risposte) {
    this.id_commento = id_commento;
    this.id_contenuto_api = id_contenuto_api;
    this.is_serie = is_serie;
    this.contenuto = contenuto;
    this.voto = voto;
    this.username_utente = username_utente;
    this.commento_risposto = commento_risposto;
    this.risposte = risposte;
  }

  public Commento(){}

  public int getId_commento() {
    return id_commento;
  }

  public void setId_commento(int id_commento) {
    this.id_commento = id_commento;
  }

  public int getId_contenuto_api() {
    return id_contenuto_api;
  }

  public void setId_contenuto_api(int id_contenuto_api) {
    this.id_contenuto_api = id_contenuto_api;
  }

  public String getContenuto() {
    return contenuto;
  }

  public void setContenuto(String contenuto) {
    this.contenuto = contenuto;
  }

  public int getVoto() {
    return voto;
  }

  public void setVoto(int voto) {
    this.voto = voto;
  }

  public String getUsername_utente() {
    return username_utente;
  }

  public void setUsername_utente(String username_utente) {
    this.username_utente = username_utente;
  }

  public int getCommento_risposto() {
    return commento_risposto;
  }

  public void setCommento_risposto(int commento_risposto) {
    this.commento_risposto = commento_risposto;
  }

  public List<Commento> getRisposte() {
    return risposte;
  }

  public void setRisposte(List<Commento> risposte) {
    this.risposte = risposte;
  }

  public boolean isIs_serie() {
    return is_serie;
  }

  public void setIs_serie(boolean is_serie) {
    this.is_serie = is_serie;
  }
}
