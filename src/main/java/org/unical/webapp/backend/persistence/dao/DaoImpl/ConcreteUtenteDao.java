package org.unical.webapp.backend.persistence.dao.DaoImpl;

import org.springframework.stereotype.Component;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.persistence.DBManager;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.ContenutoProxy;
import org.unical.webapp.backend.persistence.dao.UtenteDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ConcreteUtenteDao implements UtenteDao {

  Connection connection;

  public ConcreteUtenteDao() {this.connection = DBManager.getInstance().getConnection();;}

  @Override
  public Utente findByusername(String username) {
    try{
      PreparedStatement query = connection.prepareStatement("select * from utente where username=?");
      query.setString(1, username);
      ResultSet rs = query.executeQuery();
      if (!rs.isBeforeFirst()) return null; //chiedere al professore se serve
      rs.next();
      Utente utente = new Utente(
        rs.getString("username"),
        rs.getString("email"),
        rs.getString("password"),
        rs.getBlob("img_profilo"),
        rs.getBlob("imgbackground"),
        rs.getBoolean("admin")
      );

      return utente;

    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Utente> findAll() {
    List<Utente> utenti = new ArrayList<Utente>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from utente");
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Utente utente = new Utente(
          rs.getString("username"),
          rs.getString("email"),
          rs.getString("password"),
          rs.getBlob("img_profilo"),
          rs.getBlob("imgbackground"),
          rs.getBoolean("admin")
        );

        utenti.add(utente);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return utenti;
  }

  @Override
  public void save(Utente utente) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "insert into utente (username, email, password, img_profilo, imgbackground, admin) values (?,?,?,?,?,?)"
      );

      query.setString(1, utente.getUsername());
      query.setString(2, utente.getEmail());
      query.setString(3, utente.getPassword());
      query.setBlob(4, utente.getImg_profilo());
      query.setBlob(5, utente.getImgbackground());
      query.setBoolean(6, utente.isAdmin());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void delete(Utente utente) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "delete from utente where username=?"
      );

      query.setString(1, utente.getUsername());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Contenuto> getContenutiByUtente(Utente utente) {
    List<Contenuto> contenuti = new ArrayList<Contenuto>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from contenuto_utente join contenuto on contenuto_utente.id_contenuto=contenuto.id where utente=?");
      query.setString(1, utente.getUsername());
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Contenuto contenuto = new ContenutoProxy(
          rs.getInt("id_contenuto"),
          rs.getBoolean("is_serie"),
          rs.getString("utente"),
          rs.getInt("num_stagione"),
          rs.getInt("num_episodio"),
          rs.getInt("status"),
          rs.getInt("valutazione"),
                null
        );

        contenuti.add(contenuto);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return contenuti;
  }

  @Override
  public void updateProPic(Utente utente, Blob proPic) {
    try {
      PreparedStatement query = connection.prepareStatement("update utente set img_profilo=? where username=?");
      query.setBlob(1, proPic);
      query.setString(2, utente.getUsername());
      query.executeUpdate();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void updateBgImage(Utente utente, Blob bgImage) {
    try {
      PreparedStatement query = connection.prepareStatement("update utente set imgbackground=? where username=?");
      query.setBlob(1, bgImage);
      query.setString(2, utente.getUsername());
      query.executeUpdate();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

}