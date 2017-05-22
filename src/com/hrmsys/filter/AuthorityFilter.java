package com.hrmsys.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hrmsys.model.User;


/**
 * 过滤器，控制未登录者不能进入系统
 * 注销后，通过浏览器后退将被拦截进入登录页面
 * @author wt
 * @date 2017-04-20
 *
 */
public class AuthorityFilter implements Filter{
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("hr");
		User user1 = (User) session.getAttribute("emp");
		User user2 = (User) session.getAttribute("manager");
		User user3 = (User) session.getAttribute("boss");
		if(null != user || null != user1 || null != user2 || null != user3){
			arg2.doFilter(arg0, arg1);
		}else{
			session.invalidate();
			response.getWriter().write("<script>parent.location = '/hrmsys/login.jsp'</script>");
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
