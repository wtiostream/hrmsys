package com.hrmsys.service.impl;
/**
 * @author wt
 * @date 2017-04-20
 */
import java.util.List;

import net.sf.json.JSONArray;

import com.hrmsys.bean.PageBean;
import com.hrmsys.bean.UserBean;
import com.hrmsys.dao.UserDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.Role;
import com.hrmsys.model.User;
import com.hrmsys.service.UserService;

public class UserServiceImpl implements UserService{
	private UserDAO userDAO;

	@Override
	public List<User> validateUser(String username, String password) {		
		List<User> users = userDAO.findByUsernameAndPassword(username, password);
		return users;
	}
	
	@Override
	public String list(String start, String limit) {
		PageBean pageBean = userDAO.findAll(start, limit);
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{totalProperty:"+pageBean.getTotalProperty()+",root:"+json+"}";
	}
	
	@Override
	public String getUserByCondition(UserBean userBean, String start, String limit) {
		PageBean pageBean = userDAO.findByCondition(userBean, start, limit);
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{totalProperty:"+pageBean.getTotalProperty()+",root:"+json+"}";
	}
	@Override
	public String deleteByIds(String ids) {
		String[] userIds = ids.split(",");
		if(userDAO.deleteByIds(userIds)){
			return StaticValue.DELETE_SUCCESS;
		}
		return StaticValue.DELETE_FAILURE;
	}
	
	@Override
	public String save(User user) {
		if(userDAO.saveOrUpdate(user)){
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}
	
	@Override
	public String getById(String userId) {
		List<User> users = userDAO.findById(Integer.parseInt(userId));
		return JSONArray.fromObject(users).toString();
	}
	
	@Override
	public String update(User user) {
		List<User> users = userDAO.findById(user.getUserId());
		if(null != users){
			User newUser = users.get(0);
			newUser.setUserRemark(user.getUserRemark());
			if(userDAO.update(newUser)){
				return StaticValue.UPDATE_SUCCESS;
			}
		}
		return StaticValue.UPDATE_FAILURE;
	}
	


	/**follow is getter and setter**/
	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@Override
	public int getRoleById(String empId) {
		// TODO Auto-generated method stub
		List<User> list = userDAO.getRoleById(empId);
		if(list == null){
			return 0;
		}
		int id = list.get(0).getRole().getRoleId();
		return id;
	}
	
	@Override
	public int getKeyById(String empId) {
		// TODO Auto-generated method stub
		List<User> list = userDAO.getRoleById(empId);
		int id = list.get(0).getUserId();
		return id;
	}

}
